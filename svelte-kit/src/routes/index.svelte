<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<template>
	<header>
		<p>Boschtmann</p>
	</header>
	<main>

	</main>
	<footer>

	</footer>
</template>

<style global lang="postcss">
	#app {
		@apply flex flex-col justify-center;

		& > header {
			@apply bg-red-500;
		}
	}
</style>
