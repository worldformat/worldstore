import { createSession, generateSessionToken, validateCredentials } from '$lib/server/auth';
import { setSessionCookie } from '$lib/server/cookie';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { decode } from 'decode-formdata';
import * as v from 'valibot';

const LoginData = v.object({
	username: v.pipe(v.string(), v.nonEmpty()),
	password: v.pipe(v.string(), v.nonEmpty())
});

export const actions = {
	default: async (event) => {
		const data = decode(await event.request.formData());
		const parsed = v.safeParse(LoginData, data);

		if (!parsed.success) {
			return fail(400, { issues: v.flatten(parsed.issues).nested });
		}
		const { username, password } = parsed.output;
		if (!validateCredentials(username, password)) {
			return fail(400, { message: 'Invalid username or password.' });
		}

		const token = generateSessionToken();
		const session = await createSession(token);

		setSessionCookie(event, token, session.expiresAt);
		redirect(303, '/');
	}
} satisfies Actions;
