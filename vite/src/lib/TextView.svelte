<script context="module" lang="ts">
</script>

<script lang="ts">
	export let data: any;
</script>

<template>
	<div class="json-view">
        <p>TextView</p>
        <p>{JSON.stringify(data, null, 2)}
    </div>
</template>

<style global lang="postcss">
</style>
