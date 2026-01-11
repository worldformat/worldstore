import type { Worldstore } from '.';
import { Storage, type GetFilesOptions } from '@google-cloud/storage';

export class GCSWorldstore implements Worldstore {
	private storage: Storage;
	private prefix?: string;
	private cache = new Map<string, { content: string; ts: number }>();
	private cacheTtl = 0; // milliseconds

	constructor(
		private bucket: string,
		options: {
			prefix?: string;
			cacheTtl?: number;
		} = {}
	) {
		this.storage = new Storage();
		const { prefix, cacheTtl } = options;
		if (prefix) {
			this.prefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
		}
		if (cacheTtl) {
			this.cacheTtl = cacheTtl;
		}
	}

	async createWorld(id: string, content: string): Promise<void> {
		await this.getFile(id).save(content, { contentType: 'text/plain' });
	}

	async getWorlds(): Promise<{ id: string }[]> {
		const options: GetFilesOptions = { prefix: this.prefix };
		const [files] = await this.getBucket().getFiles(options);
		return files
			.filter((file) => file.name.endsWith('.world'))
			.map((file) => {
				let name = file.name;

				if (this.prefix && name.startsWith(this.prefix)) {
					name = name.slice(this.prefix.length);
				}

				const id = name.replace(/\.world$/, '');

				return { id };
			});
	}

	async hasWorld(id: string): Promise<boolean> {
		const [exists] = await this.getFile(id).exists();
		return exists;
	}

	async getWorldContent(id: string): Promise<string | null> {
		const entry = this.cache.get(id);
		if (entry && Date.now() - entry.ts < this.cacheTtl) {
			return entry.content;
		}

		const resp = await this.getFile(id).download();
		const content = resp.toString();

		this.cache.set(id, { content, ts: Date.now() });
		return resp.toString();
	}

	async updateWorldContent(id: string, content: string): Promise<void> {
		await this.getFile(id).save(content, { contentType: 'text/plain' });
	}

	async deleteWorld(id: string): Promise<void> {
		await this.getFile(id).delete();
	}

	private getFile(id: string) {
		return this.getBucket().file(this.getPath(id));
	}

	private getBucket() {
		return this.storage.bucket(this.bucket);
	}

	private getPath(id: string) {
		return `${this.prefix}${id}.world`;
	}
}
