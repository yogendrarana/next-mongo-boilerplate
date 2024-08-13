export const API_AUTH_PREFIX_ROUTE = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/terms",
  "/privacy",  
  "/build-a-board",
  "/products",
  "/product/[slug]",
  "/preview/product/[slug]",
  "/categories/[slug]",
];

export const PUBLIC_ROUTE_HANDLERS = [
  "/api/v1/",
];

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/reset",
  "/verify",
  "/register",
  "/auth-error",
  "/new-password"
];

export const PROTECTED_ROUTES = [
  "/dashboard/projects",
  "/dashboard/settings",
];
