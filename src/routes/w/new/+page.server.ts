import { fail, redirect, type Actions } from '@sveltejs/kit';
import { decode } from 'decode-formdata';
import * as v from 'valibot';

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

		// TODO: create the world

    redirect(303, `/w/${parsed.output.id}`)
	}
} satisfies Actions;
