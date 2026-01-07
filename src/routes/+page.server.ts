import { worldstore } from "$lib/server/worldstore";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
  const worlds = await worldstore.getWorlds();
  return { worlds };
};
