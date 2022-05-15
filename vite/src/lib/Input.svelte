<script lang="ts" context="module">
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from './Icon.svelte';

	let ruleMap = new Map<string, RegExp>([
		[
			'email',
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		]
	]);
</script>

<script lang="ts">
	export let value = '';
	export let placeholder = 'Placeholder';
	export let label: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let disabled: boolean = false;
	export let rules: string[] = [];
	let errorMessages: string[] = [];

	const dispatch = createEventDispatcher<{change: string}>();

	onMount(() => {
		if (value.length != 0) onInput();
	});

	function onInput() {
		errorMessages = [];
		rules.forEach((str) => {
			const rule = ruleMap.get(str);
			if (!rule) {
				errorMessages.push(`No rule ${str}`);
				return;
			}
			if (!value.match(rule)) errorMessages.push(`No valid ${str}`);
		});
		dispatch('change', value);
	}
</script>

<template>
	<div class="input">
		<input
			bind:value
			on:input={onInput}
			{placeholder}
			{disabled}
			class:has-icon={icon}
			class:has-error={errorMessages.length}
		/>
		<div class="has-error">
			{#if label}
				<p class="label">{label}</p>
			{/if}
			<div>
				{#if icon}
					<Icon name={icon} />
				{/if}
				<div class="app-control-group">
					<slot />
				</div>
			</div>
			{#each errorMessages as msg}
				<p class="text-danger-500">{msg}</p>
			{/each}
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
                bg-gray-100 border border-gray-300 rounded-md
                px-2 py-1
                text-sm caret-accent-500
                shadow-sm transition-all;
			caret-width: 4px;

			&.has-error {
				@apply caret-danger-500;
			}

			&.has-icon {
				@apply pl-9;
			}

			&:hover,
			&:active {
				@apply bg-gray-50
                      shadow;
			}
			&:focus {
				@apply bg-white
                      shadow-inner;
			}
		}

		& > input:focus + div {
			@apply ring-2 ring-offset-2
                      ring-accent-500 ring-offset-gray-100;
			& > div {
				& > .app-icon {
					@apply text-accent-500;
				}
			}
		}

		& > input.has-error:focus + div {
			@apply ring-danger-500;

			& > div > .app-icon {
				@apply text-danger-500;
			}
		}

		& > div {
			@apply pointer-events-none
                h-full -mt-10 sm:-mt-9
                rounded-md transition-all;
			& > .label {
				@apply h-4 -mt-5 mb-1;
			}
			& > div {
				@apply flex h-full;
				& > .app-icon {
					@apply text-gray-500 ml-2 mr-auto;
				}
				& > .app-control-group {
					@apply pointer-events-auto;
					& > .app-button {
						&:last-child {
							@apply rounded-l-none;
						}
						&:not(:last-child) {
							@apply rounded-none;
						}
					}
				}
			}
		}
	}
</style>
