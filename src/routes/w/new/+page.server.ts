import { parse } from 'worldformat';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { decode } from 'decode-formdata';
import * as v from 'valibot';
import { worldstore } from '$lib/server/worldstore';

const NewWorld = v.object({
	id: v.pipe(
		v.string(),
		v.nonEmpty(),
		v.regex(/^[a-z0-9_-]+$/, 'Use only lowercase letters, numbers, underscores, or hyphens.')
	),
	content: v.string()
});
type NewWorld = v.InferOutput<typeof NewWorld>;

export const actions = {
	default: async ({ request }) => {
		const data = decode(await request.formData());
		const parsed = v.safeParse(NewWorld, data);

		if (!parsed.success) {
			return fail(400, { issues: v.flatten(parsed.issues).nested });
		}

		const { id, content } = parsed.output;
		try {
			parse(content);
		} catch (err: any) {
			return fail(400, { issues: { id: undefined, content: `Invalid world format: ${err.message}` } });
		}

		try {
			await worldstore.createWorld(id, content);
		} catch (err: any) {
			console.error(err);
			return fail(500, { message: `Error creating the world: ${err?.message}` });
		}

		redirect(303, `/w/${id}`);
	}
} satisfies Actions;
