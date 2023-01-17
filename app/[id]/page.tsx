import Redirector from "@/components/Redirector";
import {getBaseUrl} from "@/utils/api";
import {ShortUrl} from "@/pages/api/urls";

type Params = {
  params: {
    id: string
  }
}

export default async function Page({params: {id}}: Params) {
  const page = await fetch(`${getBaseUrl()}/api/urls`)
  const data: { urls: ShortUrl[] } = await page.json()
  const {urls} = data
  const url = urls.find(u => u.id === Number(id))
  if (!url) return <div>URL not found</div>
  return <Redirector url={url.url}/>
}