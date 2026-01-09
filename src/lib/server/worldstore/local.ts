import { DateTime } from 'luxon';
import { access, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { constants } from 'node:fs';
import type { Worldstore } from '.';

export class LocalWorldstore implements Worldstore {
	private worldsDir: string;

	constructor(worldsDir?: string) {
		if (!worldsDir) {
			this.worldsDir = join(process.cwd(), 'data/worlds');
		} else if (isAbsolute(worldsDir)) {
			// absolute path
			this.worldsDir = worldsDir;
		} else {
			// relative path
			this.worldsDir = join(process.cwd(), worldsDir);
		}
	}

	async createWorld(id: string, content: string) {
		const filePath = join(this.worldsDir, `${id}.world`);

		await mkdir(this.worldsDir, { recursive: true });
		await writeFile(filePath, content, { flag: 'wx' });
	}

	async getWorlds() {
		try {
			const files = await readdir(this.worldsDir, { withFileTypes: true });

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

	async hasWorld(id: string): Promise<boolean> {
		const filePath = join(this.worldsDir, `${id}.world`);

		try {
			await access(filePath, constants.F_OK);
			return true;
		} catch (err: any) {
			console.error(err);
			if (err.code === 'ENOENT') return false;
			throw err;
		}
	}

	async getWorldContent(id: string) {
		const filePath = join(this.worldsDir, `${id}.world`);

		try {
			return await readFile(filePath, 'utf-8');
		} catch (err) {
			// World not found or unreadable
			return null;
		}
	}

	async updateWorldContent(id: string, content: string) {
		const currentPath = join(this.worldsDir, `${id}.world`);
		const historyDir = join(this.worldsDir, 'history', id);

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

	async deleteWorld(id: string) {
		const currentPath = join(this.worldsDir, `${id}.world`);
		const historyRoot = join(this.worldsDir, 'history', id);

		await Promise.all([
			rm(currentPath, { force: true }),
			rm(historyRoot, { recursive: true, force: true })
		]);
	}
}
