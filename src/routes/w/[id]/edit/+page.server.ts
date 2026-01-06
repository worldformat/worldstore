import { getWorldContent, updateWorldContent } from '$lib/server/world/local';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { decode } from 'decode-formdata';
import * as v from 'valibot';
import { parse } from '$lib/worldformat';

export const load: PageServerLoad = async ({ params }) => {
	const content = await getWorldContent(params.id);
	const world = { id: params.id, content };
	return { world };
};

const WorldData = v.object({
	content: v.string()
});
type WorldData = v.InferOutput<typeof WorldData>;

export const actions = {
	default: async ({ params, request }) => {
		const id = params.id || error(404, 'No world');
		const data = decode(await request.formData());
		const parsed = v.safeParse(WorldData, data);
		if (!parsed.success) {
			return fail(400, { issues: v.flatten(parsed.issues).nested });
		}

		const { content } = parsed.output;
		try {
			parse(content);
		} catch (err: any) {
			return fail(400, { issues: { content: `Invalid world format: ${err.message}` } });
		}

		try {
			await updateWorldContent(id, content);
		} catch (err: any) {
			console.error(err);
			return fail(500, { message: `Error saving the world: ${err.message}` });
		}

		redirect(303, `/w/${id}`);
	}
} satisfies Actions;
