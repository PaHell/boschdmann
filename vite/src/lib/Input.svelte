<script lang="ts" context="module">
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from './Icon.svelte';
</script>

<script lang="ts">
	export let value = '';
	export let placeholder = 'Placeholder';
	export let icon: string | undefined = undefined;
	export let disabled: boolean = false;
	export let invalid: boolean = false;
	export let large: boolean = false;
	export let focusOnMount: boolean = false;

	let ref : HTMLInputElement;

	onMount(() => {
		if (focusOnMount) focus();
	});

	export function focus() {
		ref.focus();
	}
</script>

<template>
	<div class="input" class:large>
		<input
			bind:value
			bind:this={ref}
			on:input
			{placeholder}
			{disabled}
			class:has-icon={!!icon}
			class:invalid
		/>
		<div>
			{#if icon}
				<Icon name={icon} />
			{/if}
			<div>
				<slot />
			</div>
		</div>
	</div>
</template>

<style global lang="postcss">
	.input {
		@apply flex flex-col
          justify-items-stretch items-stretch
		  h-10;
		& > input {
			@apply h-full outline-none
				px-2 py-1
                bg-gray-50 rounded
				border border-gray-300
				ring-0 ring-offset-0
				ring-transparent ring-offset-transparent
				shadow-sm
                text-sm caret-accent-500
                transition-all;

			&.has-icon {
				@apply pl-9;
			}

			&:hover,
			&:active {
				@apply bg-white shadow;
			}
			&:focus {
				@apply ring-2 ring-offset-2
				ring-accent-500 ring-offset-gray-100
				bg-white shadow-inner;
			}
		}

		& > input:focus + div {
			& > .app-icon {
				@apply text-accent-500;
			}
		}

		& > input.invalid:focus + div {
			@apply ring-danger-500;

			& > .app-icon {
				@apply text-danger-500;
			}
		}

		& > div {
			@apply pointer-events-none
			flex justify-between items-center
            h-full -mt-10;
			& > .app-icon {
				@apply text-gray-500 ml-2;
			}
			& > div {
				@apply flex h-full pointer-events-auto;
			}
		}

		&.large {
			@apply h-14;
			& > input {
				@apply text-lg;
			}
			& > div {
				@apply -mt-14;
			}
		}
	}
</style>
