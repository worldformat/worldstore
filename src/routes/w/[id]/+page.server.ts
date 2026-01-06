import { getWorldContent, hasWorld } from "$lib/server/world/local";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const content = await getWorldContent(params.id);
  const world = { id: params.id, content };
  return { world };
};

export const actions = {
  delete: async ({ params }) => {
    const id = params.id || error(404, "No world");
    const has = await hasWorld(id)
    if (!has) error(404, "No world");

    await deleteWorld(params.id!);
    redirect(303, '/');
  }
} satisfies Actions;

async function deleteWorld(id: string) {
  // TODO
  console.log('delete:', id)
}