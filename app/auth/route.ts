import { backendBaseUrl, refreshTokenErrorMessage } from '@/lib/constant'
import {
  compressPayload,
  decompressPayload,
  defaultSession,
  refreshAccessToken,
  SessionData,
  sessionOptions,
} from '@/lib/session'
import { User } from '@/types/auth'
import axios, { isAxiosError } from 'axios'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// login
export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as {
    username: string
    password: string
  }

  if (!backendBaseUrl) {
    return NextResponse.json(
      { error: 'Please provide url backend' },
      { status: 400 }
    )
  }

  try {
    const user = await axios.post<User>(`${backendBaseUrl}/api/auth/login`, {
      username,
      password,
    })

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    const dataSession = compressPayload({
      token: user.data.token,
      refreshToken: user.data.refresh_token,
      expireIn: user.data.expire_in,
      refreshExpireIn: user.data.refresh_expire_in,
      isLoggedIn: true,
      username: username,
    })

    session.token = dataSession

    await session.save()

    return Response.json(session)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  const decompressData = decompressPayload(session.token)

  if (!decompressData?.isLoggedIn) {
    return Response.json(defaultSession)
  }

  const dateNow = Date.now()
  const expireIn = decompressData.expireIn * 1000
  const isTokenExpired = dateNow > expireIn

  // rotation token
  if (isTokenExpired) {
    try {
      // Get new token
      const res = await refreshAccessToken(
        decompressData.token as string,
        decompressData.refreshToken as string
      )

      // Update session
      if (res) {
        const response = {
          token: res.token,
          refreshToken: res.refresh_token,
          expireIn: res.expire_in,
          refreshExpireIn: res.refresh_expire_in,
          isLoggedIn: true,
          username: decompressData.username,
        }

        const session = await getIronSession<SessionData>(
          cookies(),
          sessionOptions
        )

        const dataSession = compressPayload(response)

        session.token = dataSession
        session.updateConfig({
          ...sessionOptions,
          cookieOptions: {
            ...sessionOptions.cookieOptions,
            expires: new Date(),
          },
        })
        await session.save()

        return Response.json(response)
      }
    } catch (error) {
      let statusCode = 401

      if (isAxiosError(error)) {
        statusCode = error.status ?? 401
      }

      session.error = refreshTokenErrorMessage
      await session.save()

      return NextResponse.json(
        {
          error: refreshTokenErrorMessage,
        },
        {
          status: statusCode,
        }
      )
    }
  }

  return Response.json(decompressData)
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.destroy()
  return Response.json(defaultSession)
}
