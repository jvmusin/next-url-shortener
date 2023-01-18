// noinspection HtmlRequiredTitleElement

import './globals.css'
import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='grid h-screen w-screen place-items-center bg-zinc-100'>
        {children}
      </body>
    </html>
  )
}
