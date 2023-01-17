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
    <form onSubmit={handleSubmit}>
      <label htmlFor="url">URL</label>
      <input type="url" id="url" name="url" required/>

      <button type="submit">Submit</button>
    </form>
  )
}