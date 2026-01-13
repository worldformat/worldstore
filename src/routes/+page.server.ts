import { requireLogin } from "$lib/server/utils";
import { worldstore } from "$lib/server/worldstore";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
  requireLogin();
  const worlds = await worldstore.getWorlds();
  return { worlds };
};
