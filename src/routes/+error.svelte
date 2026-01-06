<script lang="ts">
	import { page } from '$app/state';
	// import { SUPPORT_EMAIL } from '$lib/constants';

	let title = page.status === 404 ? 'Page not found' : 'Error';
	let message = page.status === 404
		? 'Sorry, we couldn’t find the page you’re looking for.'
		: page.error?.message || 'An unexpected error has occurred.';
</script>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
  <div class="text-center">
    <p class="text-base font-semibold text-emerald-600 dark:text-emerald-400">{page.status}</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">{title}</h1>
    <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">{message}</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="/" class="btn btn-primary px-3 py-1.5">Go back home</a>
      <!-- <a href="mailto:{SUPPORT_EMAIL}" class="text-sm font-semibold text-gray-900 dark:text-white">Contact support <span aria-hidden="true">&rarr;</span></a> -->
    </div>
  </div>
</main>
