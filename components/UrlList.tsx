'use client'

import {useUrlsFetch} from "@/utils/use-fetch";

const UrlItem = ({url}: { url: string }) => {
  return (
    <li>
      <a href={url} target='_blank' rel="noreferrer">
        {url}
      </a>
    </li>
  )
}

export default function UrlList() {
  const response = useUrlsFetch()
  if (response.isLoading) return <div>Loading...</div>
  const urls = response.urls
  return (
    <div>
      <ul>
        {urls.map(shortUrl => <UrlItem key={shortUrl.id} url={shortUrl.url}/>)}
      </ul>
    </div>
  )
}