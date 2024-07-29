import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"
import { NextResponse } from "next/server";
import {
    AUTH_ROUTES,
    PUBLIC_ROUTES,
    API_AUTH_PREFIX_ROUTE,
    PROTECTED_ROUTES,
    PUBLIC_ROUTE_HANDLERS,
    DEFAULT_LOGIN_REDIRECT
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;

    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX_ROUTE);
    const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);
    const isPublicRouteHandlers = PUBLIC_ROUTE_HANDLERS.includes(nextUrl.pathname);

    // If public route or api route. No need to check authentication:
    if (isPublicRoute || isApiAuthRoute || isPublicRouteHandlers) {
        return;
    }

    // Is Auth Route. First, check is authenticated:
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl),
            );
        }
        return;
    }

    // Is Protected routes. If not authenticated, redirect to /auth:
    if (isProtectedRoute && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(
            new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth", nextUrl));
    }

    return;
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};