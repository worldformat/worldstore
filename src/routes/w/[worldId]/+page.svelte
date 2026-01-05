<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';
	import TabBar, { type Tab } from '$lib/components/TabBar.svelte';

	let { data } = $props();

	const tabs: Tab[] = $derived([
		{ label: "View", href: `/w/${data.world.id}`, current: true },
		{ label: "Edit", href: `/w/${data.world.id}/edit` },
		// { label: "History", href: "#history" },
	]);
</script>

<Prose class="mx-auto max-w-prose px-4 py-8">
	<div class="mb-2">
		<a href="/" class="text-sm no-underline hover:underline text-secondary">&larr; Back to Worlds</a>
	</div>
	<div class="flex justify-between mb-2">
		<h1 class="mb-0">{data.world.id}</h1>
		<TabBar {tabs} class="not-prose" />
	</div>
	<pre>{data.world.content}</pre>
</Prose>
