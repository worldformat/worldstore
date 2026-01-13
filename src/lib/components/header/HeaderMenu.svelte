<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import HeroiconsUserCircle from '~icons/heroicons/user-circle';

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
</script>

<div bind:this={root}>
	<div class="flex items-center">
		<button
			onclick={() => (open = !open)}
			class="cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
		>
			<HeroiconsUserCircle class="size-7" />
		</button>
	</div>
	{#if open}
		<ul
			role="menu"
			class="absolute right-0 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
		>
			<li>
				<form method="post" action="?/signOut" use:enhance>
					<button role="menuitem" class="btn btn-menu">Sign out</button>
				</form>
			</li>
		</ul>
	{/if}
</div>
