<script context="module" lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
</script>

<script lang="ts">
	export let title = '';
	export let items: any[] = [];
	export let active = -1;

	const dispatch = createEventDispatcher<{change: number}>();

	function setActive(index: number) {
		active = index;
		dispatch("change", active);
	}
</script>

<template>
	<div class="list">
		<header>
			<h3>{title}</h3>
			<Button icon="search-line" variant="sec" />
			<Button icon="add-line" variant="pri" />
		</header>
		<main>
			<div class="indicator">
				<div style="margin-top: {active * 2.5}rem;">
					<Icon name="arrow-drop-right-fill"/>
				</div>
			</div>
			{#each items as item, index}
				<Button variant="trans" active={index == active} on:click={() => setActive(index)}>
					<slot {item} {index} />
				</Button>
			{/each}
		</main>
	</div>
</template>

<style global lang="postcss">
	.list {
		@apply flex flex-col;
		& > header {
			@apply p-4
			flex items-center
			bg-white
			border-b border-gray-300;

			& > h3 {
				@apply text-lg flex-1;
			}

			& > .button:not(:last-child) {
				@apply mr-2;
			}
		}

		& > main {
			@apply flex-1 py-4
			overflow-x-visible overflow-y-auto;
			& > .button {
				@apply w-full py-3
				justify-start
				rounded-none
				border-0
				transition-all;

				&.active {
					@apply bg-gradient-to-r from-transparent to-gray-200;
				}
				&:hover,
				&:focus {
					@apply bg-gradient-to-r from-gray-200 to-transparent;
				}
				&:hover.active,
				&:focus.active {
					@apply bg-gradient-to-r from-gray-200 to-gray-200;
				}
				&:active {
					@apply bg-gradient-to-r from-gray-300 to-gray-200 !important;
				}
			}
			& > .indicator {
				@apply flex justify-end mr-[-12px];
				& > div {
					@apply w-[24px] h-[24px] absolute
					border border-gray-300
					bg-white shadow rounded-full
					transition-[margin] duration-300;
					transform: translateY(calc((2.5rem - 24px) / 2));
					& > .icon > i {
						@apply indent-px text-gray-500;
					}
				}
			}
		}
	}
</style>
