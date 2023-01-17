'use client';

import {useEffect} from "react";

export default function Redirector({url}: { url: string }) {
  useEffect(() => {
    setTimeout(() => window.location.replace(url), 3000)
  }, [url])
  return (
    <div>
      You will be redirected to <a href={url}>{url}</a> soon.
    </div>
  )
}