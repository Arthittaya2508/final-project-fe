'use client'

import useToast from '@/hooks/use-toast'
import axiosInstance from '@/lib/axios'
import { refreshTokenErrorMessage } from '@/lib/constant'
import { SessionData } from '@/lib/session'
import { Token } from '@/types/auth'
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

interface AuthContextType {
  username: string | null
  loginMutation: UseMutationResult<
    AxiosResponse<SessionData, unknown>,
    Error,
    {
      username: string
      password: string
    },
    unknown
  >
  logoutMutation: UseMutationResult<
    AxiosResponse<SessionData, unknown>,
    Error,
    void,
    unknown
  >
  session: Token | null
}

type ReducerType = Omit<AuthContextType, 'loginMutation' | 'logoutMutation'>

interface LogoutAction {
  type: 'logout'
}
interface LoginAction {
  type: 'login'
  payload: string
}

type AppActions = LogoutAction | LoginAction

const AuthContext = createContext<AuthContextType | null>(null)

function reducer(state: ReducerType, actions: AppActions) {
  switch (actions.type) {
    case 'login':
      return { ...state, username: actions.payload }

    case 'logout':
      return { ...state, username: null }

    default:
      return state
  }
}

function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Token | null
}) {
  const router = useRouter()
  const toaster = useToast()

  const [state, dispatch] = useReducer(reducer, {
    username: session?.username || '-',
    session: session,
  })

  const {
    error,
    isError,
    data: sessionResponse,
    isFetched,
  } = useQuery({
    queryKey: ['get-session'],
    queryFn: async () => {
      const res = await axios.get<Token>('/api/auth')
      return res.data
    },
    retry: 1,
    initialData: session,
    staleTime: 0,
  })

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      return axios.post<SessionData>('/api/auth', {
        username,
        password,
      })
    },
    onSuccess(_res, variables) {
      dispatch({ type: 'login', payload: variables.username })
      router.replace('/')
    },
    onError(err) {
      toaster.error({ content: err.message })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => axios.delete<SessionData>('/api/auth'),
    onSuccess() {
      dispatch({ type: 'logout' })
      axiosInstance.defaults.headers.common.Authorization = null
      router.push('/auth/signin')
    },
  })

  const callLogout = useMemo(() => {
    return logoutMutation.mutate
  }, [logoutMutation.mutate])

  useEffect(() => {
    if (isError) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data.error === refreshTokenErrorMessage
        const errorStatus = error.status === 406
        const isRefreshTokenError = errorMessage && errorStatus
        if (isRefreshTokenError) {
          callLogout()
        }
      }
    }
  }, [isError, error, callLogout])

  useEffect(() => {
    if (!sessionResponse?.isLoggedIn && isFetched) {
      callLogout()
    }
  }, [sessionResponse?.isLoggedIn, callLogout, isFetched])

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        loginMutation,
        logoutMutation,
        session: sessionResponse || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined || context === null)
    throw new Error('AuthContext was used outside of the AuthContextProvider')
  return context
}

export { AuthProvider, useAuthContext }
