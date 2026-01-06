<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { beforeNavigate } from "$app/navigation";
  import autosize from "$lib/attachments/autosize";
	import Prose from "$lib/components/Prose.svelte";
	import TabBar, { type Tab } from "$lib/components/TabBar.svelte";
	import WorldMenu from "$lib/components/world/WorldMenu.svelte";

  let { data, form } = $props();
  let editor: HTMLFormElement
  let content = $state('');
  let dirty = $derived(data.world.content !== content);
  let bypassConfirm = $state(false);

	const tabs: Tab[] = $derived([
		{ label: "View", href: `/w/${data.world.id}` },
		{ label: "Edit", href: `/w/${data.world.id}/edit`, current: true },
  ]);

  $effect.pre(() => { content = data.world.content ?? '' });

  function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			editor.requestSubmit();
		}
	}

  beforeNavigate(({ cancel }) => {
    if (bypassConfirm) return;
    if (dirty && !confirm('You have unsaved changes. Leave without saving?')) {
      cancel();
    }
  });
</script>

<Prose class="mx-auto max-w-prose px-4 py-8">
	<div class="mb-2">
		<a href="/" class="text-sm no-underline hover:underline text-secondary">&larr; Back to Worlds</a>
	</div>
	<div class="flex mb-2 gap-x-3">
		<h1 class="mb-0 flex-1">{data.world.id}</h1>
		<div class="not-prose flex gap-x-3">
      <TabBar {tabs} />
      <WorldMenu worldId={data.world.id} />
    </div>
	</div>
  <form bind:this={editor} method="post" class="not-prose mt-6" use:enhance={() => ({ result }) => {
    if (result.type ===  'redirect') {
      bypassConfirm = true;
    }
    return applyAction(result);
  }}>
    <div class="border-b border-gray-900/10 pb-6 mb-4 dark:border-white/10">
      <textarea
        name="content"
        rows="10"
        class="scrollable block resize-y w-full max-h-[70vh] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500"
        placeholder="Write the world…"
        onkeydown={handleKeydown}
        required
        defaultValue={data.world.content}
        bind:value={content}
        {@attach autosize(content)}
      ></textarea>
      {#if form?.issues?.content}<p class="error mt-1">{form.issues.content}</p>{/if}
    </div>
    {#if form?.message}<p class="error">{form.message}</p>{/if}
    <div class="flex gap-x-2 justify-end mt-1">
      <a class="btn btn-ghost px-3 py-1.5 no-underline" href="/w/{data.world.id}" onclick={() => bypassConfirm = true}>Cancel</a>
      <button type="submit" class="btn btn-primary px-3 py-1.5">Save</button>
    </div>
  </form>
</Prose>