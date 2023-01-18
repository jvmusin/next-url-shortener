import Redirector from '@/components/Redirector'
import { getBaseUrl } from '@/utils/api'

type Params = {
  params: {
    id: string
  }
}

type ResponseBody = {
  url: string
}

async function fetchUrl(id: Number) {
  const result = await fetch(`${getBaseUrl()}/api/urls/${id}`, {
    cache: 'no-store'
  })
  if (!result.ok) return null
  const body: ResponseBody = await result.json()
  return body.url
}

export default async function RedirectPage({ params: { id } }: Params) {
  const url = await fetchUrl(Number(id))
  if (!url) return <div>URL not found</div>
  return <Redirector url={url} />
}
