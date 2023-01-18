import { getBaseUrl } from '@/utils/api'
import useSWRMutation from 'swr/mutation'
import { ShortUrl } from '@/pages/api/urls'

type PostArgs = {
  arg: { url: string }
}

const getFetcher = <T>(url: string) => fetch(url).then<T>(res => res.json())
const postFetcher = <T>(url: string, { arg }: PostArgs) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then<T>(res => res.json())

const urlsUrl = `${getBaseUrl()}/api/urls`
export const fetchUrls = () => getFetcher<ShortUrl[]>(urlsUrl)

export const usePostUrlMutation = () => {
  const { isMutating, reset, data, error, trigger } = useSWRMutation<number>(
    urlsUrl,
    postFetcher
  )
  return { isMutating, reset, id: data, error, trigger }
}
