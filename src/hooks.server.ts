import { hasAuth, validateSessionToken } from '$lib/server/auth';
import { SESSION_COOKIE_NAME } from '$lib/server/constants';
import { deleteSessionCookie, setSessionCookie } from '$lib/server/cookie';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/')) {
		// TODO: auth the API request

		return resolve(event);
	}

	if (!hasAuth) {
		return resolve(event);
	}

	const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
	if (token === null) {
		event.locals.session = null;
		return resolve(event);
	}

	const session = await validateSessionToken(token);
	if (session != null) {
		setSessionCookie(event, token, session.expiresAt);
	} else {
		deleteSessionCookie(event);
	}

	event.locals.session = session;
	return resolve(event);
};
