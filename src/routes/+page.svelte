<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Worldstore</title>
</svelte:head>

<Prose class="mx-auto max-w-prose px-4 py-8">
	<div class="flex gap-x-3 justify-between">
		<h1>Worlds</h1>
		<div class="not-prose">
			<a href="/w/new" class="btn btn-primary px-3 py-2">New World</a>
		</div>
	</div>
	{#if data.worlds.length}
		<ul>
			{#each data.worlds as world}
				<li><a href="/w/{world.id}" class="no-underline focus:underline">{world.id}</a></li>
			{/each}
		</ul>
	{:else}
		<p>No worlds.</p>
	{/if}
</Prose>
