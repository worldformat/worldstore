import { LocalWorldstore } from './local';
import { env } from '$env/dynamic/private';
import { GCSWorldstore } from './gcs';

export interface Worldstore {
	createWorld(id: string, content: string): Promise<void>;
	getWorlds(): Promise<{ id: string }[]>;
	hasWorld(id: string): Promise<boolean>;
	getWorldContent(id: string): Promise<string | null>;
	updateWorldContent(id: string, content: string): Promise<void>;
	deleteWorld(id: string): Promise<void>;
}

function createWorldstore(): Worldstore {
	if (env.WORLDSTORE_URL?.startsWith('gs://')) {
		const [bucket, ...pathParts] = env.WORLDSTORE_URL.substring(5).split('/');
		const prefix = pathParts.join('/');
		return new GCSWorldstore(bucket, prefix);
	}
	return new LocalWorldstore(env.WORLDSTORE_URL);
}

export const worldstore = createWorldstore();
