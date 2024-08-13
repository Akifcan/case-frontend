'use client'
import Alert from '@/components/alert/alert'
import Spinner from '@/components/loader/spinner'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function HealthCheckContainer({ children }: Readonly<{ children: ReactNode }>) {
  const { error, data, isLoading } = useQuery({
    queryKey: ['healthcheck'],
    queryFn: async () => {
      return await fetcher<{ status: boolean }>('/health/check', {
        method: 'GET',
      })
    },
  })

  if (isLoading) {
    return (
      <div className="flex row align-items-center justify-content-center">
        <p>Health checking...</p>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <Alert type="error" message="Healthcheck error" />
  }

  return <>{children}</>
}
