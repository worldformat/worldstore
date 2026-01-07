import type { Worldstore } from '.';
import { Storage, type GetFilesOptions } from '@google-cloud/storage';

export class GCSWorldstore implements Worldstore {
	private storage: Storage;

	constructor(
		private bucket: string,
		private prefix?: string
	) {
		this.storage = new Storage();
	}

	createWorld(id: string, content: string): Promise<void> {
		throw new Error('Method not implemented.');
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

	hasWorld(id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async getWorldContent(id: string): Promise<string | null> {
		const resp = await this.getBucket().file(this.getPath(id)).download();
		return resp.toString();
	}

	updateWorldContent(id: string, content: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteWorld(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	private getBucket() {
		return this.storage.bucket(this.bucket);
	}

	private getPath(id: string) {
		return `${this.prefix}${id}.world`;
	}
}
