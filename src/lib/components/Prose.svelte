<script lang="ts">
	let { children, class: klass = "" } = $props();
</script>

<div
	class="prose prose-zinc dark:prose-invert prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-semibold {klass}"
>
	{@render children?.()}
</div>
