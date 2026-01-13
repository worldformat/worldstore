import { env } from '$env/dynamic/private';
import * as v from 'valibot';
import { worldstore } from '../worldstore';
import { parse } from 'worldformat';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { SYSTEM_WORLD_ID } from '../constants';

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

export function validateCredentials(username: string, password: string) {
	if (!hasAuth) return true;

	const [u, p] = env.WORLDSTORE_AUTH_CREDENTIALS!.split(':', 2);
	if (!(u && p)) {
		console.error('Invalid WORLDSTORE_AUTH_CREDENTIALS value.');
		return false;
	}

	return username === u && password === p;
}

export function generateSessionToken() {
	return nanoid();
}

export async function createSession(token: string) {
	const expires = DateTime.utc().plus({ days: 30 });

	const content = `[auth/session]
token = "${token}"
expiresAt = ${expires.toUnixInteger()}
`;

	await worldstore.updateWorldContent(SYSTEM_WORLD_ID, content);

	return { expiresAt: expires.toJSDate() };
}

export async function validateSessionToken(token: string) {
	const content = await worldstore.getWorldContent(SYSTEM_WORLD_ID);
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

export async function invalidateSession() {
	await worldstore.updateWorldContent(SYSTEM_WORLD_ID, '# blank system world\n');
}
