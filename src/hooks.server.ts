import { hasAuth, validateSessionToken } from '$lib/server/auth';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/')) {
		// TODO: auth the API request

		return resolve(event);
	}

	if (hasAuth) {
		const session = await validateSessionToken('xxx');
		event.locals.session = session;
		return resolve(event);
	}

	return resolve(event);
};