<script lang="ts">
	import { page } from "$app/state";

  let { children } = $props();
  
</script>

<svelte:head>
  <title>{page.params.id} – Worldstore</title>
</svelte:head>

{@render children()}