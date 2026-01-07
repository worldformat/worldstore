import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { worldstore } from '$lib/server/worldstore';

export const GET: RequestHandler = async ({ params }) => {
	const content = await worldstore.getWorldContent(params.id);
	if (content === null) {
		error(404, 'World not found');
	}

	return new Response(content);
};
