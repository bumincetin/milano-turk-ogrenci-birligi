// Middleware disabled for static export
// This file is kept for reference but not used in static mode

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In static mode, middleware doesn't run
// Language detection is handled client-side

export function middleware(request: NextRequest) {
  // Pass through all requests in static mode
  return NextResponse.next()
}

export const config = {
  // Disable middleware matching for static export
  matcher: [],
}
