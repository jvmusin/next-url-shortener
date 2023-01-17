import Redirector from "@/components/Redirector";
import {getBaseUrl} from "@/utils/api";
import {type ShortUrl} from "@/pages/api/urls";

type Params = {
  params: {
    id: string
  }
}

type ResponseBody = {
  urls: ShortUrl[]
}

async function fetchUrl(id: Number) {
  const result = await fetch(`${getBaseUrl()}/api/urls`,
    {cache: 'no-store'}
  )
  const {urls}: ResponseBody = await result.json()
  return urls.find(u => u.id === Number(id))
}

export default async function RedirectPage({params: {id}}: Params) {
  const url = await fetchUrl(Number(id))
  if (!url) return <div>URL not found</div>
  return <Redirector url={url.url}/>
}
