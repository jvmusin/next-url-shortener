import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export type ShortUrl = {
  id: number
  url: string
}

export const urls: ShortUrl[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  if (req.method === 'POST') {
    const { url } = req.body
    urls.push({ url, id: -1 })
    const id = urls.indexOf(url)
    urls[id].id = id
    res.status(201).json(urls[id])
  }
}
