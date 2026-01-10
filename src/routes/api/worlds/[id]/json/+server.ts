import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { worldstore } from '$lib/server/worldstore';
import { parse } from 'worldformat';

export const GET: RequestHandler = async ({ params }) => {
	const content = await worldstore.getWorldContent(params.id);
	if (content === null) {
		error(404, 'World not found');
	}

	try {
		const world = parse(content);
		return json(world);
	} catch (e) {
		console.error('World parse error:', e);
		error(400, 'World parse error');
	}
};
