import useSWRMutation from 'swr/mutation'
import { postFetcher, urlsUrl } from '@/utils/urlsFetcherer'

export const usePostUrlMutation = () => {
  const { isMutating, reset, data, error, trigger } = useSWRMutation<number>(
    urlsUrl,
    postFetcher
  )
  return { isMutating, reset, id: data, error, trigger }
}
