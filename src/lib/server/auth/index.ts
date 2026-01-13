import { env } from '$env/dynamic/private';
import * as v from 'valibot';
import { worldstore } from '../worldstore';
import { parse } from 'worldformat';

export const hasAuth = !!env.WORLDSTORE_AUTH_CREDENTIALS;

const System = v.object({
	auth: v.optional(
		v.object({
			session: v.optional(
				v.object({
					token: v.string(),
					expiresAt: v.number() //unix timestamp (seconds)
				})
			)
		})
	)
});
type System = v.InferOutput<typeof System>;

export async function validateSessionToken(token: string) {
	const content = await worldstore.getWorldContent('_system');
	if (!content) {
		console.debug('No auth session.');
		return null;
	}

	let world: System;
	try {
		world = v.parse(System, parse(content));
	} catch (err) {
		console.error('Invalid system world:', err);
		return null;
	}

	const session = world.auth?.session;

	if (!session) {
		console.debug('No auth session.');
		return null;
	} else if (session.token !== token) {
		console.info('Inconsistent session token.');
		return null;
	} else if (session.expiresAt * 1000 < Date.now()) {
		console.debug('Session expired.');
		return null;
	}

	return { expiresAt: new Date(session.expiresAt * 1000) };
}
