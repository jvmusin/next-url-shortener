import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { fetchUrl } from '@/utils/urlsFetcherer'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.match(/\/\d+/)) {
    const id = Number(request.nextUrl.pathname.substring(1))
    const url = await fetchUrl(id)
    return NextResponse.redirect(new URL(url!))
  }
}
