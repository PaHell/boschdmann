<script context="module" lang="ts">
  	import './assets/app.css';
  	import 'remixicon/fonts/remixicon.css'
	import Button from './lib/Button.svelte';
	import List from './lib/List.svelte';
	import Icon from './lib/Icon.svelte';
  	import RequestView from './lib/RequestView.svelte';
	import { RequestContentTypes, RequestCredentials, RequestMethods, RequestModes } from './enum';
import { onMount } from 'svelte';
</script>

<script lang="ts">
	let selectedRequest : App.Request | undefined;
	let selectedRequestIndex = -1;
	let requests: App.Request[] = [
		{
			name: 'Opaque Response',
			url: 'https://jsonplaceholder.typicode.com/posts',
			routeParam: {},
			queryParam: {},
			bodyParam: {}, 
			method: RequestMethods.GET,
			mode: RequestModes.NO_CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Index Posts',
			url: 'https://jsonplaceholder.typicode.com/posts',
			routeParam: {},
			queryParam: {},
			bodyParam: {},
			method: RequestMethods.GET,
			mode: RequestModes.CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Get Post (Route)',
			url: 'https://jsonplaceholder.typicode.com/posts/[:id]',
			routeParam: {
				id: 1
			},
			queryParam: {},
			bodyParam: {},
			method: RequestMethods.GET,
			mode: RequestModes.CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Get Comment (Query)',
			url: 'https://jsonplaceholder.typicode.com/comments',
			routeParam: {},
			queryParam: {
				postId: 1
			},
			bodyParam: {},
			method: RequestMethods.POST,
			mode: RequestModes.CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Request Put',
			url: 'http://bosch.de',
			routeParam: {},
			queryParam: {},
			bodyParam: {
				user: {
					id: 1,
					name: "Name",
					password: "Password",
					parent: undefined, 
					group: null, 
				},
				claims: [
					"lorem",
					"ipsum",
					NaN,
					Infinity
				]
			},
			method: RequestMethods.PUT,
			mode: RequestModes.NO_CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Request Patch',
			url: 'http://bosch.de',
			routeParam: {},
			queryParam: {},
			bodyParam: {
				user: 'user',
				password: 'password'
			},
			method: RequestMethods.PATCH,
			mode: RequestModes.NO_CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		},
		{
			name: 'Request Delete',
			url: 'http://bosch.de',
			routeParam: {},
			queryParam: {},
			bodyParam: {
				user: 'user',
				password: 'password'
			},
			method: RequestMethods.DELETE,
			mode: RequestModes.NO_CORS,
			credentials: RequestCredentials.INCLUDE,
			ContentType: RequestContentTypes.JSON
		}
	];

	onMount(() => {
		selectedRequestIndex = 0;
		selectedRequest = requests[selectedRequestIndex];
	});

	function onRequestViewChange(e : CustomEvent<number>) {
		selectedRequest = undefined;
		setTimeout(() => {
			selectedRequest = requests[e.detail];
		});
	}

	function saveRequest() {
		console.log({saveRequest});
	}

	function removeRequest() {
		console.log({removeRequest});
		requests.splice(selectedRequestIndex, 1);
		requests = requests;
	}
</script>

<svelte:head>
	<title>Boschdmann - API Testing</title>
	<meta name="description" content="Postman Clone to test restful APIs" />
</svelte:head>

<template>
	<header>
		<div>
			<!--
				<img src="#" alt="Boschdmann Logo" />
			-->
			<Icon name="mail-send-fill"/>
			<h1>Boschdmann</h1>
		</div>
		<Button icon="settings-line" text="Settings" />
	</header>
	<div id="content">
		<nav>
			<List title="My Collection" items={requests} bind:active={selectedRequestIndex} on:change={onRequestViewChange}>
				<svelte:fragment let:item let:index>
					<div class="badge badge-{item.method.toLowerCase()}">
						<p>{item.method}</p>
					</div>
					<p>{item.name}</p>
				</svelte:fragment>
			</List>
		</nav>
		<main>
			{#if selectedRequest}
				<RequestView bind:request={selectedRequest} on:remove={removeRequest} on:save={saveRequest} />
			{:else}
				<p>Loading...</p>
			{/if}
		</main>
	</div>
	<footer>
		<p>&copy; 2018 Deutsche Boschd</p>
		<a href="#">Documentation</a>
		<a href="#">GitHub</a>
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

	#app {
		@apply flex flex-col justify-center;

		& > header {
			@apply h-16 pr-4
			flex items-center
			bg-white shadow;

			& > div {
				@apply w-80 h-full mr-auto
				flex justify-center items-center
				border-r border-accent-500
				bg-accent-400;

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
		}

		& > #content {
			@apply flex-1 flex overflow-hidden;

			& > nav {
				@apply w-80
				border-t border-t-accent-500
				border-r border-r-gray-300
				overflow-y-auto overflow-x-hidden;

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
