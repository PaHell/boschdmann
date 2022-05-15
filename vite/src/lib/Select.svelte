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
                @apply max-h-0 overflow-hidden
                p-[4px] m-[-4px];
                margin-top: calc(-2px);
                transition: max-height .3s ease-in-out;
                will-change: max-height;
    
                & > div {
                    @apply overflow-hidden
                    py-2 border border-gray-300
                    bg-gray-50 shadow rounded;
    
                    & .button {
                        @apply flex-shrink-0 
                        rounded-none border-none;
    
                        &.active {
                            &:before {
                                content: "";
                                @apply block absolute h-5 w-[2px] rounded-full;
                            }
                        }
                    }
                }
    
            }
            &.open > div {
                @apply max-h-96;
            }
        }
	}
</style>