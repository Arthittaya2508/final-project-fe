'use client'
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const contextClass = {
  success: 'border-success-700 border-solid border-1 ',
  error: 'border-danger-500 border-solid border-1',
  info: '',
  default: '',
  warning: '',
}

const ToastProvider: FC = (): JSX.Element => {
  return (
    <ToastContainer
      className={'!w-[440px]'}
      toastClassName={context =>
        contextClass[context?.type || 'default'] +
        ' relative flex p-1 m-2 rounded-md justify-between overflow-hidden cursor-pointer bg-light text-black min-h-3'
      }
    />
  )
}

export default ToastProvider
