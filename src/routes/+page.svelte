<script lang="ts">
	import HeaderMenu from '$lib/components/header/HeaderMenu.svelte';
	import Prose from '$lib/components/Prose.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Worldstore</title>
</svelte:head>

<header class="border-b border-gray-150 dark:border-gray-800 px-4 py-2 flex justify-end">
	<HeaderMenu />
</header>

<Prose class="mx-auto max-w-prose px-4 pt-6 pb-8">
	<div class="flex justify-between gap-x-3">
		<h1>Worlds</h1>
		<div class="not-prose">
			<a href="/w/new" class="btn btn-primary px-3 py-2">New World</a>
		</div>
	</div>
	{#if data.worlds.length}
		<ul class="mt-0 list-none pl-0">
			{#each data.worlds as world}
				<li class="my-0! pl-0">
					<a
						href="/w/{world.id}"
						class="text-l -mx-4 block px-4 py-2 no-underline sm:rounded-md hocus:bg-gray-150 hocus:dark:bg-gray-800"
						>{world.id}</a
					>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No worlds.</p>
	{/if}
</Prose>
