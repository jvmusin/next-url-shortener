import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export type ShortUrl = {
  id: number
  url: string
}

const urls: ShortUrl[] = []

console.log('Loading urls.ts')

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
    console.log('In POST with urls', urls)
    const { url } = req.body
    const obj = { url, id: -1 }
    urls.push(obj)
    const id = urls.indexOf(obj)
    urls[id].id = id
    res.status(201).json(id)
  } else if (req.method === 'GET') {
    console.log('In GET with urls', urls)
    res.json(urls)
  }
}
