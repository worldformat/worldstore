import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { worldstore } from "$lib/server/worldstore";
import { requireLogin } from "$lib/server/utils";

export const load: PageServerLoad = async ({ params }) => {
  const content = await worldstore.getWorldContent(params.id);
  if (content === null) error(404, "No world");

  const world = { id: params.id, content };
  return { world };
};

export const actions = {
  delete: async ({ params }) => {
    requireLogin();
    const id = params.id || error(404, "No world");
    const has = await worldstore.hasWorld(id)
    if (!has) error(404, "No world");

    await worldstore.deleteWorld(id);
    redirect(303, '/');
  }
} satisfies Actions;
