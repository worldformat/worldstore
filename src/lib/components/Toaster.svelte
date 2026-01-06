<script lang="ts" module>
	type ToastData = {
		title: string;
		description?: string;
		type?: 'success' | 'error'; // default is 'success'
	};

	const toaster = new Toaster<ToastData>();

	export const addToast = toaster.addToast;
</script>

<script lang="ts">
	import { Toaster } from 'melt/builders';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import HeroiconsCheckCircle from '~icons/heroicons/check-circle';
	import HeroiconsXMark from '~icons/heroicons/x-mark';
	import HeroiconsExclamationCircle from '~icons/heroicons/exclamation-circle';
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#each toaster.toasts as toast (toast.id)}
			<div
				{...toast.content}
				animate:flip={{ duration: 500 }}
				in:fly={{ duration: 200, x: '100%' }}
				out:fly={{ duration: 200, x: '100%' }}
				class="pointer-events-auto w-full max-w-sm rounded-lg bg-white opacity-100 shadow-lg outline-1 outline-black/5 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10"
			>
				<div class="p-4">
					<div class="flex items-start">
						<div class="shrink-0">
							{#if toast.data?.type === 'error'}
								<HeroiconsExclamationCircle class="size-6 text-red-400" />
							{:else}
								<HeroiconsCheckCircle class="size-6 text-green-400" />
							{/if}
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p {...toast.title} class="text-sm font-medium text-gray-900 dark:text-white">
								{toast.data.title}
							</p>
							{#if toast.data.description}
								<p {...toast.description} class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{toast.data.description}
								</p>
							{/if}
						</div>
						<div class="ml-4 flex shrink-0">
							<button
								{...toast.close}
								type="button"
								class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 dark:hover:text-white dark:focus:outline-primary-500"
							>
								<span class="sr-only">Close</span>
								<HeroiconsXMark class="size-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
