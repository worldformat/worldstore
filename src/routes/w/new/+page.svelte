<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Prose from '$lib/components/Prose.svelte';
	import autosize from '$lib/attachments/autosize';

	let { form } = $props();
	let editor: HTMLFormElement;
	let content = $state('');
	let submitting = $state(false);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			editor.requestSubmit();
		}
	}
</script>

<Prose class="mx-auto max-w-prose px-4 py-8">
	<div class="mb-2">
		<a href="/" class="text-secondary text-sm no-underline hover:underline">&larr; Back to Worlds</a
		>
	</div>

	<h1>New World</h1>

	<form bind:this={editor} method="post" class="not-prose mt-6" use:enhance={() => {
		submitting = true;
		return ({ result }) => applyAction(result).finally(() => submitting = false);
	}}>
    <div class="border-b border-gray-900/10 pb-6 mb-4 dark:border-white/10">
      <div>
        <input type="text" name="id" placeholder="World ID" class="form-control w-full" required />
        {#if form?.issues?.id}<p class="error mt-1">{form.issues.id}</p>{/if}
      </div>
      <div class="mt-2">
        <textarea
          name="content"
          rows="10"
          class="scrollable block max-h-[70vh] w-full resize-y rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500"
          placeholder="Write the world… (see worldformat.org)"
          onkeydown={handleKeydown}
          bind:value={content}
          {@attach autosize(content)}
        ></textarea>
        {#if form?.issues?.content}<p class="error mt-1">{form.issues.content}</p>{/if}
      </div>
    </div>
    {#if form?.message}<p class="error">{form.message}</p>{/if}
		<div class="flex justify-end mt-1 gap-x-2">
			<a class="btn btn-ghost px-3 py-1.5 no-underline" href="/">Cancel</a>
			<button type="submit" class="btn btn-primary px-3 py-1.5" disabled={submitting}>Save</button>
		</div>
	</form>
</Prose>
