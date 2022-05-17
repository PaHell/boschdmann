<script context="module" lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { createEventDispatcher, SvelteComponent } from 'svelte';
</script>

<script lang="ts">
import Input from "./Input.svelte";

	export let title = '';
	export let items: any[] = [];
	export let active = -1;
	export let filter : (item: any) => string = (i) => i?.toString();  
	
	let searchInput = "";
	let itemsVisible: boolean[] = [];
	let showSearch = false;
	let withoutNullActive = -1;

	let refSearchInput : SvelteComponent;

	$: {
		let nulls = 0;
		for (let i = 0; i <= active; i++) {
			if (items[i] === null) nulls++;
		}
		withoutNullActive = active - nulls;
	}

	const dispatch = createEventDispatcher<{change: number, add: void}>();

	function setActive(index: number) {
		active = index;
		dispatch("change", active);
	}

	function add() {
		dispatch("add");
	}

	function toggleSearch() {
		showSearch = !showSearch;
		// toggle (focus | clear) depending on state
		if (showSearch) {
			setTimeout(() => {
				refSearchInput.focus();
			}, 0);
		} else {
			searchInput = "";
			itemsVisible.fill(true);
		}
	}

	function search() {
		console.log({search: searchInput});
		// this could be better ...
		const searchLower = searchInput.toLowerCase();
		itemsVisible = items.reduce((acc, curr) => {
			const itemString = filter(curr).toLowerCase();
			console.log({curr, itemString, searchLower, visible: itemString.includes(searchLower)});
			acc.push(itemString.includes(searchLower));
			return acc;
		}, []);
		itemsVisible = itemsVisible;
	}
</script>

<template>
	<div class="list">
		<header>
			{#if showSearch}
				<Input bind:this={refSearchInput} bind:value={searchInput} on:input={search} icon="search-line" placeholder="Search" />
			{:else}
				<h3>{title}</h3>
			{/if}
			<Button icon={showSearch ? "close-line" : "search-line"} variant="sec" on:click={toggleSearch} />
			<Button icon="add-line" variant="pri" on:click={add} />
		</header>
		<main>
			{#if items.filter(i => i !== null).length !== 0}
				<div class="indicator">
					<div style="margin-top: {withoutNullActive * 2.5}rem;">
						<Icon name="arrow-drop-right-fill"/>
					</div>
				</div>
				{#each items as item, index}
					{#if item && (!showSearch || (showSearch && itemsVisible[index]))}
						<Button variant="trans" active={index == active} on:click={() => setActive(index)}>
							<slot {item} {index} />
						</Button>
					{/if}
				{/each}
			{:else}
				<slot name="empty"/>
			{/if}
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

			& > *:first-child {
				@apply flex-1 mr-2 min-w-0;
			}

			& > h3 {
				@apply text-lg;
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
