<script context="module" lang="ts">
	import { createEventDispatcher, SvelteComponent } from 'svelte';
	import { RequestContentTypes, RequestCredentials, RequestMethods, RequestModes } from '../enum';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Icon from "./Icon.svelte";
	import Select from "./Select.svelte";
	import JsonView from "./JsonView.svelte";
</script>

<script lang="ts">
import ArrayExport from "./ArrayExport.svelte";

	export let request: App.Request | undefined;
	let response: Response | undefined;
	let data: any;
	let error: any;
	let showResponse = false;
	let parsedUrl = "";

	const dispatch = createEventDispatcher<{remove: void, save: App.Request}>();
	
	let refNameInput : SvelteComponent;

	export function focus() {
		refNameInput.focus();
	}

	function download() {
		if (!data) return;
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 4));
		const anchor = document.createElement('a');
		anchor.setAttribute("href",     dataStr     );
		anchor.setAttribute("download", `${request.name.replace(" ", "_")}.json`);
		anchor.click();
	}
	
	function toClipboard() {
		const str = JSON.stringify(data, null, 4)
			.replace(/"([^"]+)":/g, '$1:');
		navigator.clipboard.writeText('\nconst data = ' + str + ';\n');
	}

	function remove() {
		dispatch("remove");
	}

	function save() {
		dispatch("save", request);
	}

	$: {
		console.warn("parsing url")
		let url = request.url;
		// add query params
		const matches = url.match(/(?<=\[)(.*?)(?=\])/g);
		if (matches != null) {
			for (const param of matches) {
				console.log({
					replace: `[${param}]`,
					with: request.routeParam[param.substring(1)]
				});
				url = url.replace(`[${param}]`, request.routeParam[param.substring(1)])
			}
		}
		// add query params
		if (Object.keys(request.queryParam).length) {
			let query = Object.entries(request.queryParam).map(i => `${i[0]}=${i[1]}`);
			url += url.slice(-1) === '/' ? '?' : '/?'
			parsedUrl = url + query;
		}
		parsedUrl = url;
	}

	function submit() {
		const config : RequestInit = {
			method: request.method,
			mode: request.mode,
			cache: 'no-cache',
			credentials: request.credentials,
			headers: {
				'Content-Type': request.contentType
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(request.bodyParam)
		};
		if (config.method === RequestMethods.GET) delete config.body;
		fetch(parsedUrl, config)
			.then((r => {
				response = r;
				if (request.contentType == RequestContentTypes.JSON) return r.json(); 
				return r.text();
			}))
			.then((d => {
				data = d;
				console.log({data});
			}))
			.catch(e => {
				console.log({e});
				error = e;
			})
			.finally(() => {
				showResponse = true;
				data = data;
				response = response;
				error = error;
			});
	}
</script>

<template>
	<div class="request-view">
		{#if request}
			<div class="flex space-x-4 items-end">
				<div class="flex-1">
					<Input focusOnMount bind:this={refNameInput} placeholder="Get Users" large bind:value={request.name}/>
				</div>
				<Button on:click={remove} icon="delete-bin-7-line" variant="sec" />
				<Button on:click={save} icon="save-line" text="Save" variant="pri" />
			</div>
			<div class="request-general">
				<p class="label">Wildcard URL</p>
				<Input placeholder="https://example.org/model/[:id]" bind:value={request.url}/>
				<div class="request-config">
					<Select items={Object.values(RequestMethods)} bind:value={request.method}>
						<svelte:fragment slot="selected" let:item>
							<p>{item}</p>
						</svelte:fragment>					
						<svelte:fragment slot="item" let:item>
							<p>{item}</p>
						</svelte:fragment>
					</Select>
					<Select items={Object.values(RequestModes)} bind:value={request.mode}>
						<svelte:fragment slot="selected" let:item>
							<p>{item}</p>
						</svelte:fragment>					
						<svelte:fragment slot="item" let:item>
							<p>{item}</p>
						</svelte:fragment>
					</Select>
					<Select items={Object.values(RequestContentTypes)} bind:value={request.contentType}>
						<svelte:fragment slot="selected" let:item>
							<p>{item}</p>
						</svelte:fragment>					
						<svelte:fragment slot="item" let:item>
							<p>{item}</p>
						</svelte:fragment>
					</Select>
					<Select items={Object.values(RequestCredentials)} bind:value={request.credentials}>
						<svelte:fragment slot="selected" let:item>
							<p>{item}</p>
						</svelte:fragment>					
						<svelte:fragment slot="item" let:item>
							<p>{item}</p>
						</svelte:fragment>
					</Select>
				</div>
			</div>
			<div class="request-params">
				<main>
					<div>
						<p class="label">Route</p>
						<JsonView data={request.routeParam}/>
					</div>
					<div>
						<p class="label">Query</p>
						<JsonView data={request.queryParam}/>
					</div>
					{#if request.method !== RequestMethods.GET}
						<div>
							<p class="label">Body</p>
							<JsonView data={request.bodyParam}/>
						</div>
					{/if}
				</main>
				<p class="label">Parsed URL</p>
				<p>{parsedUrl}</p>
			</div>
			<div class="flex justify-center">
				<Button on:click={submit} text="Submit" icon="play-line" variant="pri" />
			</div>
			{#if (showResponse)}
				<div class="request-params">
					<p class="label">Response Status</p>
					<p class="status-{response?.status}">{response?.status}</p>
					<main>
						{#if Array.isArray(data)}
						<div>
							<p class="label">Response (Array-View)</p>
							<ArrayExport data={data}/>
						</div>
						{:else if data}
						<div>
							<p class="label">Response</p>
							<JsonView data={data}/>
						</div>
						{/if}
						{#if error}
							<div>
								<p class="label">Error</p>
								<JsonView data={error}/>
							</div>
						{/if}
					</main>
				</div>
				{#if data}
					<div class="flex space-x-4 justify-center items-center">
						<p class="label">Export</p>
						<Button on:click={download} icon="download-line" text="Download .json" variant="sec" />
						<Button on:click={toClipboard} icon="clipboard-line" text="Copy Javascript" variant="sec" />
					</div>
				{/if}
			{/if}
		{:else}
			<div class="h-full flex justify-center items-center">
				<Icon name="file-list-3-fill" large css="text-gray-400 mr-4"/>
				<h1 class="text-2xl text-gray-400">None selected</h1>
			</div>
		{/if}
	</div>
</template>

<style global lang="postcss">
	.request-view {
		@apply p-4;

		& > * {
			@apply w-full;

			&:not(:last-child) {
				@apply mb-4 pb-4 border-b border-gray-300;
			}
		}

		& > .request-name {
			@apply flex items-center;

			& > h3 {
				@apply text-lg;
			}

			& > .button {
				&:not(:last-child) {
					@apply mr-4;
				}
				&:nth-child(2) {
					@apply ml-4 mr-auto;
				}
			}
		}

		& > .request-general {
			@apply space-y-4 border-dashed;
			& > .request-config {
				@apply grid grid-cols-2 gap-4;
			}
		}

		& > .request-params {
			@apply space-y-4;

			& > main {
				@apply flex;

				& > div {
					@apply flex-1 flex-shrink-0 overflow-hidden;

					&:not(:last-child) {
						@apply mr-4;
					}
	
					& > .json-view {
						@apply max-h-96;
					}
				}
			}

			& > p:not(.label) {
				@apply px-2 text-lg text-gray-700;
				@apply mt-0 !important;
			}
		}

		& > .request-send {
			@apply flex space-x-4;

			& > .json-view,
			& > p {
				@apply flex-1;
			}

			& > p {
				@apply px-0 text-gray-500 leading-10;
			}
		}

	}
</style>
