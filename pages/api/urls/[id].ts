import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { fetchUrls } from '@/utils/use-fetch'

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

  const id = Number(req.query.id)
  const urls = await fetchUrls()
  const result = urls.find(u => u.id === id)
  if (!result) res.status(404).end()
  else res.json(result.url)
}
