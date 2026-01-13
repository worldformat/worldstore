import { requireLogin } from '$lib/server/utils';
import { worldstore } from '$lib/server/worldstore';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { invalidateSession } from '$lib/server/auth';
import { deleteSessionCookie } from '$lib/server/cookie';

export const load: PageServerLoad = async () => {
	requireLogin();
	const worlds = await worldstore.getWorlds();
	return { worlds };
};

export const actions = {
	signOut: async (event) => {
		if (!event.locals.session) {
			redirect(302, '/login');
		}

		await invalidateSession();
		deleteSessionCookie(event);

		redirect(302, '/login');
	}
} satisfies Actions;
