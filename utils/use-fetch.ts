import useSWR from 'swr'
import { getBaseUrl } from '@/utils/api'
import useSWRMutation from 'swr/mutation'
import { ShortUrl } from '@/pages/api/urls'

type PostArgs = {
  arg: { url: string }
}

const getFetcher = (url: string) => fetch(url).then(res => res.json())
const postFetcher = (url: string, { arg }: PostArgs) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

const urlsUrl = `${getBaseUrl()}/api/urls`

export const useUrlsFetch = () => {
  const { data, mutate, isLoading, error, isValidating } = useSWR(
    urlsUrl,
    getFetcher
  )
  const urls: ShortUrl[] = data?.urls
  return {
    urls,
    mutate,
    isLoading,
    error,
    isValidating
  }
}
export const usePostUrlMutation = () => useSWRMutation(urlsUrl, postFetcher)
