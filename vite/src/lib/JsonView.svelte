<script context="module" lang="ts">
    /**
     * text-green-500
     * text-purple-500
     * text-red-500
     * text-gray-600
     * text-gray-400
     * text-blue-500
     * text-fuchsia-500
     * text-orange-500
     */
</script>

<script lang="ts">
	export let data: any;

    function propertyToJsonRow(indent: number, key: string, value: any, forceIndent = false) : App.JsonSymbol[] {
        //console.log({indent, key, value});
        let result : App.JsonSymbol[] = [];
        if (key) {
            result.push({
                indent,
                value: key,
                color: 'white',
                breakAfter: false,
            }, {
                indent: 0,
                value: ': ',
                color: 'gray-600',
                breakAfter: false,
            });
        }
        let valueSymbol : App.JsonSymbol = {
                    indent: forceIndent ? indent : 0,
                    value,
                    color: 'gray-600',
                    breakAfter: false,
                };
        switch (typeof(value)) {
            case 'string':
                //console.log(' -> string');
                valueSymbol.value = `"${value}"`
                valueSymbol.color ='orange-500';
                break;
            case 'number':
                //console.log(' -> number');
                valueSymbol.color ='blue-500';
                break;
            case 'boolean':
                //console.log(' -> boolean');
                valueSymbol.color ='green-500';
                break;
            case 'undefined':
                //console.log(' -> undefined/null');
                valueSymbol.color ='purple-500';
                break;
            }
            if (value === null) {
               valueSymbol.color ='fuchsia-500';
            }
            result.push(valueSymbol);

            if (Array.isArray(value)) {
                //console.log(' -> array', value.length);
                valueSymbol.breakAfter = true;
                valueSymbol.value ='[';
                valueSymbol.color ='gray-400';
                for (let item of value) {
                    result.push(...propertyToJsonRow(indent + 1, "", item, true));
                }
                result.push({
                    indent,
                    value: "]",
                    color: "gray-400",
                    breakAfter: false
                });
            }
            else if (!!value && typeof(value) === 'object') {
                //console.log(' -> object', {entries : Object.entries(value)});
                valueSymbol.breakAfter = true;
                valueSymbol.value ='{';
                valueSymbol.color ='gray-400';
                for (let kvp of Object.entries(value)) {
                    result.push(...propertyToJsonRow(indent + 1, kvp[0], kvp[1]))
                }
                result.push({
                        indent,
                        value: "}",
                        color: "gray-400",
                        breakAfter: false
                    });
            }
            result.push({
                    indent: 0,
                    value: ",",
                    color: "gray-600",
                    breakAfter: true
                });
            const last = result[result.length - 2];
            if (last.value === ']' || last.value === '}') last.value = '';
            return result;
        }
</script>

<template>
	<div class="json-view">
        <p>
            {#each propertyToJsonRow(0, "", data) as elem}
                <span class="text-{elem.color}" style="padding-left: {elem.indent}rem">
                    {elem.value}
                </span>
                {#if elem.breakAfter}
                <br>
                {/if}
            {/each}
        </p>
    </div>
</template>

<style global lang="postcss">
	.json-view {
		@apply flex flex-col
        overflow-auto py-4
        bg-gray-900 border-black
        rounded;

        & > p {
            @apply px-4 text-white font-mono
            whitespace-nowrap;
        }
	}
</style>
