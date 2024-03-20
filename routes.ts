/**
 *  An array of routes that are accessible to public and do not require authentication
 * @type {string[]}
 */

const publicRoutes = ["/"];

/**
 *  An array of routes that are used for authentication. These will redirect logged in users to settings page
 * @type {string[]}
 */

const authRoutes = ["/auth/login", "/auth/register"];

/**
 *  Prefix for API routes that are used for authentication purposes. Never block them
 * @type {string}
 */
const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/settings";

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };
