import { getWorldContent, updateWorldContent } from '$lib/server/world/local';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { decode } from 'decode-formdata';
import * as v from 'valibot';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.worldId;
	const content = await getWorldContent(id);
	const world = { id, content };
	return { world };
};

const WorldData = v.object({
	content: v.string()
});
type WorldData = v.InferOutput<typeof WorldData>;

export const actions = {
	default: async ({ params, request }) => {
		const id = params.worldId!;
		const data = decode(await request.formData());
		const parsed = v.safeParse(WorldData, data);
		if (!parsed.success) {
			return fail(400, { issues: v.flatten(parsed.issues).nested });
		}

		await updateWorldContent(id, parsed.output.content);
		redirect(303, `/w/${id}`);
	}
} satisfies Actions;
