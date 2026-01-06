import { DateTime } from 'luxon';
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { env } from '$env/dynamic/private';
import { constants } from 'node:fs';

const WORLDS_DIR = env.WORLDSTORE_LOCAL_PATH ?? join(process.cwd(), 'data/worlds');

export async function getWorlds() {
	try {
		const files = await readdir(WORLDS_DIR, { withFileTypes: true });

		return files
			.filter((f) => f.isFile())
			.filter((f) => f.name.endsWith('.world'))
			.map((f) => ({
				id: f.name.replace(/\.world$/, ''),
				filename: f.name
			}));
	} catch (err) {
		// Treat a missing directory as an empty world list
		return [];
	}
}

export async function hasWorld(id: string): Promise<boolean> {
	const filePath = join(WORLDS_DIR, `${id}.world`);

	try {
		await access(filePath, constants.F_OK);
		return true;
	} catch (err: any) {
		console.error(err);
		if (err.code === 'ENOENT') return false;
		throw err;
	}
}

export async function getWorldContent(id: string) {
	const filePath = join(WORLDS_DIR, `${id}.world`);

	try {
		return await readFile(filePath, 'utf-8');
	} catch (err) {
		// World not found or unreadable
		return null;
	}
}

export async function updateWorldContent(id: string, content: string) {
	const currentPath = join(WORLDS_DIR, `${id}.world`);
	const historyDir = join(WORLDS_DIR, id, 'history');

	try {
		// 1. If an existing world exists, move it to history
		try {
			const existing = await readFile(currentPath, 'utf-8');

			await mkdir(historyDir, { recursive: true });

			const ts = DateTime.utc().toFormat('yyyyMMdd-HHmmss');
			const historyPath = join(historyDir, `${ts}.world`);

			await writeFile(historyPath, existing);
		} catch {
			// No existing world (e.g. first save); nothing to archive
		}

		// 2. Write the new world as the current version
		await writeFile(currentPath, content);
	} catch (err) {
		// Fail the entire PUT operation
		throw err;
	}
}
