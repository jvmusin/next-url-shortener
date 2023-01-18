'use client'

import { usePostUrlMutation } from '@/utils/use-fetch'

export default function UrlForm() {
  const postUrl = usePostUrlMutation()
  const handleSubmit = async event => {
    event.preventDefault()
    const url = event.target.url.value
    const response = await postUrl.trigger({ url })
    console.log(`The new id is`, response.id)
  }
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <input
        type='url'
        id='url'
        name='url'
        required
        className='w-full rounded-lg border border-gray-200 indent-4 leading-[2.75rem]'
        value='https://instagram.com/jvmusin'
      />

      <button
        type='submit'
        className='mt-4 h-12 w-full rounded-lg bg-purple-600 bg-gradient-to-r from-blue-500 to-fuchsia-500 font-bold text-white'
      >
        Shorten it
      </button>
    </form>
  )
}
