import {
    AUTH_ROUTES,
    PUBLIC_ROUTES,
    API_AUTH_PREFIX_ROUTE,
    ADMIN_ROUTES,
    PUBLIC_ROUTE_HANDLERS,
    DEFAULT_LOGIN_REDIRECT
} from "./routes";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { UserRoleEnum } from "./constants/enum";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;

    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX_ROUTE);
    const isAdminRoutes = ADMIN_ROUTES.includes(nextUrl.pathname);
    const isPublicRouteHandlers = PUBLIC_ROUTE_HANDLERS.includes(nextUrl.pathname);

    const isPublicRoute = PUBLIC_ROUTES.some((route) => {
        const regexPattern = new RegExp(`^${route.replace(/\[.*?\]/g, "([^/]*)")}$`);
        return regexPattern.test(nextUrl.pathname);
    });

    // If public route or api route. No need to check authentication:
    if (isPublicRoute || isApiAuthRoute || isPublicRouteHandlers) {
        return;
    }

    // Is Auth Route. First, check is authenticated:
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    // Is Admin routes. If not authenticated, redirect to /login:
    if (isAdminRoutes) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        // check if user is loggedin and role is admin
        if (!isLoggedIn && req.auth?.user.role !== UserRoleEnum.ADMIN) {
            return NextResponse.redirect(
                new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
            );
        }
        return;
    }

    // If not authenticated and not public route, redirect to /login:
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return;
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
