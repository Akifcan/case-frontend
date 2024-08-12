'use client'
import fetcher from '@/store/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { UserProps } from '@/store/features/user/user.types'
import toast, { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setLoggedIn, setUser } from '@/store/features/user/user.slice'

export default function AuthContainer({ children }: Readonly<{ children: ReactNode }>) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  const { data, refetch, isLoading } = useQuery({
    enabled: false,
    queryKey: ['auth'],
    queryFn: async () => {
      return await fetcher<{ user?: UserProps; errorCode?: string }>(`/user`, {
        method: 'GET',
      })
    },
  })

  useEffect(() => {
    if (user) {
      return
    }
    if (!Cookies.get('AUTH_TOKEN')) {
      return
    }
    refetch()
  }, [])

  useEffect(() => {
    if (data?.errorCode) {
      toast('Lütfen tekrar giriş yapın', { position: 'top-right' })
      dispatch(setLoggedIn(false))
      return
    }
    if (!data?.user) {
      return
    }
    toast(`Hoş geldin ${data.user?.name}`, { position: 'top-right' })
    dispatch(setUser(data.user))
    dispatch(setLoggedIn(true))
  }, [data])

  return !isLoading ? (
    <>
      <Toaster /> {children}
    </>
  ) : (
    <p>Please wait...</p>
  )
}
