import { LocalWorldstore } from './local';

export interface Worldstore {
	createWorld(id: string, content: string): Promise<void>;
	getWorlds(): Promise<{ id: string; }[]>;
	hasWorld(id: string): Promise<boolean>;
	getWorldContent(id: string): Promise<string | null>;
	updateWorldContent(id: string, content: string): Promise<void>;
	deleteWorld(id: string): Promise<void>;
}

export const worldstore: Worldstore = new LocalWorldstore();