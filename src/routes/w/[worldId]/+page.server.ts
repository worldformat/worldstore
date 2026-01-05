import { getWorldContent } from "$lib/world/local";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const id = params.worldId;
  const content = await getWorldContent(id);
  const world = { id, content };
  return { world };
};