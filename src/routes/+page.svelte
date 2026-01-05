<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';

	let { data } = $props();
</script>

<Prose class="mx-auto max-w-prose px-4 py-8">
	<h1>Worlds</h1>
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
