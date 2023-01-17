import type {NextApiRequest, NextApiResponse} from "next";

export type ShortUrl = {
  id: number,
  url: string
}

const urls: ShortUrl[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {url} = req.body
    const id = urls.length
    const shortUrl: ShortUrl = {url, id}
    urls.push(shortUrl)
    res.status(201).json(shortUrl)
  } else {
    res.json({urls})
  }
}