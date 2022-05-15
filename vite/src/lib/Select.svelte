<script context="module" lang="ts">
	import Btn from './Button.svelte';
	import Icon from "./Icon.svelte";
</script>

<script lang="ts">
	export let items : any[] = [];
	export let value : any;
    export let valueProp = "";
	export let opened = false;
</script>

<template>
	<div class="select">
		<Btn active={opened}
			variant="sec"
			on:click={() => opened = !opened}>
			<slot name="selected" item={value}/>
			<Icon name="arrow-drop-down-line"/>
		</Btn>
		<menu class:open={opened}>
            <div>
                <div>
                    {#each items as item}
                        <Btn
                            variant="trans"
                            active={valueProp ? value[valueProp] === item[valueProp] : value === item}
                            on:click={() => { value = item; opened = false; }}>
                            <slot name="item" {item}/>
                            <Icon name="check-line"/>
                        </Btn>
                    {/each}
                </div>
            </div>
		</menu>
	</div>
</template>

<style global lang="postcss">
	.select {
		@apply flex flex-col;

		& > .button {
            & p {
                @apply flex-1 text-left;
            }
            & .icon {
                &:last-child {
                    @apply indent-2 border-l;
                }
            }
        }
        & > menu {
            @apply h-0 relative;
            
            & > div {
                @apply max-h-0 overflow-hidden;
                transition: max-height .3s ease-in-out;
                will-change: max-height;
    
                & > div {
                    @apply overflow-hidden
                    py-2 border border-gray-300
                    bg-gray-50 shadow rounded;
    
                    & .button {
                        @apply flex-shrink-0 
                        w-full
                        rounded-none border-none;

                        & > .icon:last-child {
                            @apply hidden;
                        }

                        &:hover,
                        &:focus {
                            @apply bg-gray-100;
                        }
                        &:active {
                            @apply bg-gray-200;
                        }
    
                        &.active {
                            & > p {
                                @apply text-accent-700;
                            }
                            & > .icon:last-child {
                                @apply block text-accent-500;
                            }
                        }
                    }
    
                }
            }
            &.open > div {
                @apply max-h-96 p-[4px] m-[-4px] mt-[-2.5px];
            }
        }
	}
</style>