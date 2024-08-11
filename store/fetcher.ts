import Cookies from 'js-cookie'

interface FetcherProps extends RequestInit {
  body: any | null | undefined
}
export default async function fetcher(uri: string, request: FetcherProps) {
  const language = Cookies.get('i18n_redirected')
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${uri}`, {
    ...request,
    headers: {
      'content-type': 'application/json',
      'x-lang': language ? language : 'en',
      ...request.headers,
    },
    body: request.body ? JSON.stringify(request.body) : undefined,
  })
  return await response.json()
}
