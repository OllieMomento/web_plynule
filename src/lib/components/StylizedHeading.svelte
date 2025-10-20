<script lang="ts">
    import {
        stylizeHeading,
        defaultItalicLetters,
        type StylizedPart,
    } from "$lib";

    let {
        text = "",
        level = "h1",
        letters = defaultItalicLetters,
        class: className = "",
    } = $props();

    const parts: StylizedPart[] = stylizeHeading(text, letters);
    const firstWordEnd = (() => {
        const idx = text.indexOf(" ");
        return idx === -1 ? parts.length : idx;
    })();
    const applyHeadStyle = level === "h1";
</script>

<svelte:element this={level} class={className}>
    {#if applyHeadStyle}
        <span class="font-bold text-black">
            {#each parts as p}
                {#if p.index < firstWordEnd}
                    <span class={p.italic ? "italic" : ""}>{p.char}</span>
                {/if}
            {/each}
        </span>
        <span class="font-normal text-gray-300">
            {#each parts as p}
                {#if p.index >= firstWordEnd}
                    <span class={p.italic ? "italic" : ""}>{p.char}</span>
                {/if}
            {/each}
        </span>
    {:else}
        {#each parts as p}
            <span class={p.italic ? "italic" : ""}>{p.char}</span>
        {/each}
    {/if}
</svelte:element>

<style lang="postcss">
    @reference "tailwindcss";
</style>
