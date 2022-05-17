<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { RequestContentTypes, RequestCredentials, RequestMethods, RequestModes } from './enum';
  	import './assets/app.css';
  	import 'remixicon/fonts/remixicon.css'
	import List from './lib/List.svelte';
	import Icon from './lib/Icon.svelte';
  	import RequestView from './lib/RequestView.svelte';
</script>

<script lang="ts">
	let selectedRequest : App.Request | undefined;
	let selectedRequestIndex = -1;
	let requests: (App.Request | null)[] = [];

	onMount(() => {
		requests = getSavedRequests();
		selectedRequestIndex = 0;
		selectedRequest = requests[selectedRequestIndex];
	});

	function onRequestViewChange(e : CustomEvent<number>) {
		selectedRequest = undefined;
		setTimeout(() => {
			selectedRequest = requests[e.detail];
		});
	}

	function createRequest() {
		// add item and change selected
		selectedRequestIndex = requests.push({
			name: "",
			url: "https://",
			routeParam: {},
			queryParam: {},
			bodyParam: {},
			method: RequestMethods.GET,
			mode: RequestModes.CORS,
			credentials: RequestCredentials.INCLUDE,
			contentType: RequestContentTypes.JSON,
		}) - 1;
		// so ui notices push
		requests = requests;
		// change view
		selectedRequest = requests[selectedRequestIndex];
	}

	function getSavedRequests() : (App.Request|null)[] {
		let storage : string | null = localStorage.getItem("requests");
		if (storage == null) return [];
		const parsed = JSON.parse(storage);
		// check for array, so template doesn't break to hard if value has been manipulated
		if (Array.isArray(parsed)) return parsed; 
		return [];
	}

	function saveRequest(e : CustomEvent<App.Request>) {
		// get new, to keep other changes out
		const storage = getSavedRequests();
		// overwrite index
		storage[selectedRequestIndex] = e.detail;
		requests[selectedRequestIndex] = storage[selectedRequestIndex];
		requests = requests;
		// save whole list
		localStorage.setItem("requests", JSON.stringify(storage, null, 4));
	}
	
	function removeRequest() {
		// get new, to keep other changes out
		const storage = getSavedRequests();
		// null index
		storage[selectedRequestIndex] = null;
		requests[selectedRequestIndex] = null;
		// view first item
		const firstNotNull = requests.findIndex(i => i !== null);
		selectedRequestIndex = firstNotNull;
		selectedRequest = requests[firstNotNull];
		requests = requests;
		// save whole list
		localStorage.setItem("requests", JSON.stringify(storage, null, 4));
	}
</script>

<svelte:head>
	<title>Boschdmann - API Testing</title>
	<meta name="description" content="Postman Clone to test restful APIs" />
</svelte:head>

<template>
	<div id="content">
		<nav>
			<header>
				<Icon name="mail-send-fill"/>
				<h1>Boschdmann</h1>
			</header>
			<List title="My Collection" items={requests} bind:active={selectedRequestIndex} on:change={onRequestViewChange} on:add={createRequest} filter={(i) => i.name+i.method}>
				<svelte:fragment let:item>
					<div class="badge badge-{item.method.toLowerCase()}">
						<p>{item.method}</p>
					</div>
					<p>
						{item.name}
						{#if !item.name}
							<span class="italic">Untitled Request</span>
						{/if}
					</p>
				</svelte:fragment>
				<div slot="empty" class="empty">
					<Icon name="mail-close-line"/>
					<p>No Requests</p>
				</div>
			</List>
		</nav>
		<main>
			{#if requests.filter(i => i !== null).length === 0}
				<div class="empty h-full">
					<Icon large name="list-check-2"/>
					<h1>Nothing Selected</h1>
				</div>
			{:else if selectedRequest}
				<RequestView request={selectedRequest} on:remove={removeRequest} on:save={saveRequest} />
			{:else}
				<p>Loading...</p>
			{/if}
		</main>
	</div>
	<footer>
		<p>&copy; 2018 Deutsche Boschd</p>
		<a href="https://github.com/PaHell/boschdmann/tree/master/doc/final.pdf" title="Open Documentation in GitHub" target="_BLANK">Documentation</a>
		<a href="https://github.com/PaHell/boschdmann" title="Open GitHub Repo in new Tab" target="_BLANK">GitHub</a>
	</footer>
</template>

<style global lang="postcss">
	html,
	body,
	#app {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		@apply bg-gray-100;
		touch-action: none;
	}

	.button .badge {
		@apply w-[3.6rem]
		flex justify-center;
		& > p {
			@apply flex-shrink-0
			h-6 px-2 bg-white
			border border-gray-300
			shadow-sm rounded
			text-xs leading-[1.35rem]
			font-bold text-center;
			@apply text-inherit !important;
		}
		&.badge-get {
			@apply text-green-600;
		}
		&.badge-post {
			@apply text-blue-600;
		}
		&.badge-patch {
			@apply text-orange-500;
		}
		&.badge-put {
			@apply text-purple-500;
		}
		&.badge-delete {
			@apply text-red-500;
		}
	}

	.empty {
		@apply flex justify-center items-center
		p-4;
		& > .icon {
			@apply mr-4 text-gray-400;
		}
		& > p {
			@apply text-lg text-gray-400;
		}
		& > h1 {
			@apply text-3xl text-gray-400;
		}
	}

	#app {
		@apply flex flex-col justify-center;
		
		& > #content {
			@apply flex-1 flex overflow-hidden;
			
			& > nav {
				@apply w-80 border-r border-r-gray-300;

				& > header {
					@apply flex justify-center items-center
					border-r border-accent-500
					bg-accent-400
					mr-[-1px] pr-[1px];
					height: calc(5.25rem + 3px);
		
					& > img {
						@apply overflow-hidden
						w-9 h-9 mr-2;
					}
		
					& > .icon {
						@apply w-9 h-9 mr-2 text-black;
					}
		
					& > h1 {
						@apply text-xl font-medium;
					}
				}

				& > .list {
					@apply h-full;
				}
			}

			& > main {
				@apply flex-1
				overflow-y-auto overflow-x-hidden;

				& > .request-view {
					@apply min-h-full;
				}
			}
		}

		& > footer {
			@apply flex items-center
			h-6 px-2
			bg-gray-100 border-t
			text-xs;

			& > p {
				@apply text-gray-500;
			}
			& > a {
				@apply text-gray-700;

				&:first-of-type {
					@apply ml-auto;
				}
				&:not(:last-child) {
					@apply mr-2;
				}

				&:hover,
				&:focus,
				&:active {
					@apply text-black underline;
				}
			}
		}
	}
</style>
