<script lang="ts">
	import Prose from '$lib/components/Prose.svelte';
	import TabBar, { type Tab } from '$lib/components/TabBar.svelte';
	import WorldMenu from '$lib/components/w/WorldMenu.svelte';

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
	<div class="flex mb-2 gap-x-3">
		<h1 class="mb-0 flex-1">{data.world.id}</h1>
		<div class="not-prose flex gap-x-3">
			<TabBar {tabs} />
			<WorldMenu worldId={data.world.id} />
		</div>
	</div>
	<pre>{data.world.content}</pre>
</Prose>
