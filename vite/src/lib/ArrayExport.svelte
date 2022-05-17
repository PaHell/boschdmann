<script context="module" lang="ts">
    import JsonView from "./JsonView.svelte";
    import Button from "./Button.svelte";
    import Icon from "./Icon.svelte";
</script>

<script lang="ts">
	export let data: any;
    let selected: (number|null)[] = []; 

    function toggleSelected(index: number) {
        const indexInSelected = selected.indexOf(index);
        if (indexInSelected !== -1) selected[indexInSelected] = null;
        else selected.push(index);
        selected = selected;
    }

    function exportSelected() {
        const obj = selected.filter(i => i !== null).sort().reduce((acc, curr) => {
            acc.push(data[curr]);
            return acc;
        }, []);
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 4));
		const anchor = document.createElement('a');
		anchor.setAttribute("href",     dataStr     );
		anchor.setAttribute("download", 'myExport.json');
		anchor.click();
    }
</script>

<template>
	<div class="array-export">
        {#each data as item, index}
            <button class:selected={selected.includes(index)} on:click={() => toggleSelected(index)}>
                <Icon name="check-line"/>
                <JsonView data={item}/>
            </button>
        {/each}
    </div>
    <div class="flex justify-center">
        <Button text="Export Selected" on:click={exportSelected}/>
    </div>
</template>

<style global lang="postcss">
	.array-export {
		@apply flex flex-col;

        & > button {
            @apply flex items-center
            py-2 px-4
            text-left;
            &:not(:last-child) {
                @apply mb-2;
            }
            &:hover,
            &:focus {
                @apply bg-gray-200;
            }
            &:active {
                @apply bg-gray-300;
            }

            & > .icon {
                @apply flex-shrink-0 text-gray-300 mr-2;
            }

            &.selected > .icon {
                @apply text-accent-700;
            }

            & > .json-view {
                @apply flex-1;
            }

        }
	}
</style>
