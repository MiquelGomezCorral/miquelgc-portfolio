import { i18nRouter } from 'next-i18n-router'
import { NextResponse } from 'next/server'
import  i18nConfig  from "./i18nConfig"

export function middleware(request){
    if (request.nextUrl.pathname === "/banking" || request.nextUrl.pathname.startsWith("/banking/")) {
        return NextResponse.next()
    }

    return i18nRouter(request, i18nConfig)
}

// Make sure the middle ware is only runned over the pages and not the other files
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}
