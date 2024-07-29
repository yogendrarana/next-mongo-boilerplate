/**
 * The default redirect URL after logging in.
 * Authentication required.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * These routes are public.
 * Authentication not required.
 * 
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ["/", "/docs"];


/**
 * These routes are public api routes.
 * Authentication not required.
 * @type {string[]}
 */
export const PUBLIC_ROUTE_HANDLERS = [
  "/api/v1/",
];


/**
 * These routes are used for authentication.
 * Authentication not required.
 * @type {string[]}
 */
export const AUTH_ROUTES = [
  "/auth",
  "/reset",
  "/verify",
  "/register",
  "/auth-error",
  "/new-password"
];


/**
 * These routes are protected.
 * Required authentication.
 * @type {string[]}
 */
export const PROTECTED_ROUTES = [
  "/dashboard/projects",
  "/dashboard/settings",
];


/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * Authentication not required.
 * @type {string}
 */
export const API_AUTH_PREFIX_ROUTE = "/api/auth";