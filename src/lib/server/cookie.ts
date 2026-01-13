import type { RequestEvent } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from './constants';
import { dev } from '$app/environment';

/**
 * Set the session cookie in the response.
 * @param event The request event.
 * @param token The session token.
 * @param expiresAt The expiration date of the session cookie.
 */
export function setSessionCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(SESSION_COOKIE_NAME, token, {
		secure: !dev,
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionCookie(event: RequestEvent) {
	event.cookies.delete(SESSION_COOKIE_NAME, {
		path: '/'
	});
}
