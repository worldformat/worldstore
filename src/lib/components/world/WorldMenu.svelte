<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import HeroiconsEllipsisHorizontal20Solid from '~icons/heroicons/ellipsis-horizontal-20-solid';
	import { addToast } from '../Toaster.svelte';

	type Props = {
		worldId: string;
	};
	let { worldId }: Props = $props();
	let open = $state(false);
	let root: HTMLElement;

	onMount(() => {
		const onClick = (e: MouseEvent) => {
			if (!root.contains(e.target as Node)) {
				open = false;
			}
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	});

	function onClickDelete(e: MouseEvent) {
		const ok = confirm(`Delete the world "${worldId}"?\n\nThis will remove the entire state.`);

		if (!ok) {
			e.preventDefault();
		}
	}
</script>

<div bind:this={root} class="relative">
	<div
		class="isolate inline-flex rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
	>
		<button
			class="group relative min-w-0 cursor-pointer overflow-hidden rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
			onclick={() => (open = !open)}
		>
			<HeroiconsEllipsisHorizontal20Solid class="size-5" />
		</button>
	</div>
	{#if open}
		<ul
			role="menu"
			class="absolute right-0 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
		>
			<li>
				<form
					method="post"
					action="/w/{worldId}?/delete"
					use:enhance={() => ({ result }) => {
						if (result.type === 'redirect') {
							addToast({ data: { title: 'World deleted' } });
						}
						return applyAction(result);
					}}
				>
					<button role="menuitem" class="btn btn-menu text-rose-500!" onclick={onClickDelete}
						>Delete world</button
					>
				</form>
			</li>
		</ul>
	{/if}
</div>
