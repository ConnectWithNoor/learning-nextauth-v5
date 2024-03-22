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

const DEFAULT_LOGIN_REDIRECT = PAGES.SETTINGS_PAGE;

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };
