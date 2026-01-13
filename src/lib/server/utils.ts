import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { hasAuth } from './auth';

export function requireLogin() {
	if (!hasAuth) return;

	const { locals } = getRequestEvent();

	if (!locals.session) {
		return redirect(302, '/login');
	}
}
