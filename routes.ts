/**
 *  An array of routes that are accessible to public and do not require authentication
 * @type {string[]}
 */

import { PAGES } from "./global/routes";

const publicRoutes = ["/"];

/**
 *  An array of routes that are used for authentication. These will redirect logged in users to settings page
 * @type {string[]}
 */

const authRoutes = [PAGES.LOGIN, PAGES.REGISTER, PAGES.ERROR];

/**
 *  Prefix for API routes that are used for authentication purposes. Never block them
 * @type {string}
 */
const apiAuthPrefix = "/api/auth";

export { publicRoutes, authRoutes, apiAuthPrefix };
