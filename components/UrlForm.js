'use client'

import { usePostUrlMutation } from '@/utils/use-fetch'

export default function UrlForm () {
  const postUrl = usePostUrlMutation()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = event.target.url.value
    const response = await postUrl.trigger({ url })
    console.log(`The new id is`, response.id)
  }
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <input type="url" id="url" name="url" required
      className='w-full border rounded-lg border-gray-200 leading-[2.75rem] indent-4'
      value='https://instagram.com/jvmusin'
      />

      <button type="submit" className='w-full bg-purple-600 mt-4 bg-gradient-to-r from-blue-500 to-fuchsia-500 h-12 font-bold text-white rounded-lg'>Shorten it</button>
    </form>
  )
}