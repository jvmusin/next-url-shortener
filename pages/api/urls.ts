import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export type ShortUrl = {
  id: number
  url: string
}

const urls: ShortUrl[] = []

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
    const id = urls.length
    const shortUrl: ShortUrl = { url, id }
    urls.push(shortUrl)
    res.status(201).json(shortUrl)
  } else {
    res.json({ urls })
  }
}
