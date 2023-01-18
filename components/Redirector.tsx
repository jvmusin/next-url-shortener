'use client'

import { useEffect } from 'react'

type RedirectorProps = {
  url: string
}

export default function Redirector({ url }: RedirectorProps) {
  useEffect(() => {
    setTimeout(() => window.location.replace(url), 3000)
  }, [url])
  return (
    <div>
      You will be redirected to <a href={url}>{url}</a> soon.
    </div>
  )
}
