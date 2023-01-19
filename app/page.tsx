'use client'

import { LinkIcon } from '@heroicons/react/24/solid'
import { FormEventHandler, useEffect, useState } from 'react'
import { usePostUrlMutation } from '@/utils/use-swr'

export default function Page() {
  const postUrl = usePostUrlMutation()

  const urlToRedirect =
    postUrl.id != null
      ? new URL(postUrl.id, window.location.origin).toString()
      : null

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    postUrl.reset()
    // @ts-ignore
    const url = event.target.url.value
    const newId = await postUrl.trigger({ url })
    console.log(`The new id is`, newId)
  }

  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(id)
    }
  }, [copied])
  const handleCopy = async () => {
    if (typeof urlToRedirect === 'string') {
      await navigator.clipboard.writeText(urlToRedirect)
      setCopied(true)
    }
  }

  return (
    <div className='flex w-full max-w-sm flex-col items-center space-y-5 rounded-xl bg-white p-5'>
      <div className='mt-6 cursor-pointer rounded-3xl bg-purple-600 bg-gradient-to-br from-[#5885e0] via-[#CF4D9E] to-[#EC7951] p-3'>
        <LinkIcon className='h-14 w-14 text-white' />
      </div>
      <h1 className='mb-10 text-xl font-semibold'>Make a Short Link</h1>
      <form onSubmit={handleSubmit} className='w-full'>
        <input
          type='url'
          name='url'
          required
          className='w-full rounded-lg border border-gray-200 indent-4 leading-[2.75rem]'
          defaultValue='https://the-link-you-want-to-shorten.long'
        />

        <button
          type='submit'
          className='mt-4 h-12 w-full rounded-lg bg-purple-600 bg-gradient-to-r from-blue-500 to-fuchsia-500 font-bold text-white hover:text-opacity-70'
        >
          Shorten it
        </button>
      </form>
      <div
        onClick={handleCopy}
        className='group flex h-36 w-full cursor-pointer flex-col items-center justify-center space-y-8 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xl hover:border-2 hover:border-zinc-400 hover:bg-zinc-100'
      >
        {copied ? (
          <p className='text-center text-4xl font-semibold'>Copied!</p>
        ) : (
          <>
            <p>
              {copied
                ? 'Copied!'
                : urlToRedirect ??
                  (postUrl.isMutating ? '...' : 'Shortened link will be here')}
            </p>
            {urlToRedirect && (
              <p className='text-sm text-gray-400 group-hover:underline'>
                Click to copy
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
