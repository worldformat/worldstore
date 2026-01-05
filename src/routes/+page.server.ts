import { getWorlds } from "$lib/world/local";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
  const worlds = await getWorlds();
  return { worlds };
};
