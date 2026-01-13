<script lang="ts">
	import { enhance } from '$app/forms';
	import Prose from '$lib/components/Prose.svelte';

	let { form } = $props();
</script>

<Prose class="mx-auto max-w-xs px-4 py-8">
	<h1>Login</h1>
	<form method="post" use:enhance class="flex flex-col gap-y-3">
		<div>
			<input
				name="username"
				type="text"
				placeholder="Username"
				required
				class="form-control w-full"
			/>
			{#if form?.issues?.username}<p class="error mt-1">{form.issues.username}</p>{/if}
		</div>
		<div>
			<input
				name="password"
				type="password"
				placeholder="Password"
				required
				class="form-control w-full"
			/>
			{#if form?.issues?.password}<p class="error mt-1">{form.issues.password}</p>{/if}
		</div>
		{#if form?.message}<p class="error my-0!">{form.message}</p>{/if}
		<div class="text-right">
			<button type="submit" class="btn btn-primary px-3 py-1.5">Login</button>
		</div>
	</form>
</Prose>
