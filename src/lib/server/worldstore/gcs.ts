import type { Worldstore } from ".";

export class GCSWorldstore implements Worldstore {
  createWorld(id: string, content: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getWorlds(): Promise<{ id: string; }[]> {
    throw new Error("Method not implemented.");
  }
  hasWorld(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getWorldContent(id: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  updateWorldContent(id: string, content: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteWorld(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}