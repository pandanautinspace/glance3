<script lang="ts">
    import StudentItem from "./StudentItem.svelte";
    import type { Student } from "$lib/types";
    export let students: Student[];
    type Filter = { id: number; searchString: string; key: keyof Student };
    let id_count = 1;
    let filters: Filter[] = [
        {
            id: 0,
            searchString: "",
            key: "name",
        },
    ];
    $: filter = (students: Student[]) => {
        let filters2 = filters.map(({ searchString, key }) => {
            return { re: new RegExp(searchString, "i"), key: key };
        });
        return students.filter((x) =>
            filters2.reduce(
                (acc, { re, key }) => acc && x[key].search(re) != -1,
                true
            )
        );
    };

    $: filtered = filter(students);
</script>

{#each filters as _ (_.id)}
    <div class="filter">
        <select bind:value={_.key}>
            {#each Object.keys(students[0]) as k}
                <option value={k}>{k}</option>
            {/each}
        </select>
        <input type="search" bind:value={_.searchString} />
        {#if _.id != 0}
            <button
                on:click={() => {
                    filters = filters.filter((f) => f.id != _.id);
                }}
            >
                Remove
            </button>
        {/if}
    </div>
{/each}
<button
    on:click={() => {
        console.log("Added filter");
        filters = [
            ...filters,
            {
                id: id_count++,
                searchString: "",
                key: "name",
            },
        ];
    }}
>
    Add Filter
</button>
<div class="displaybox">
    {#if filtered.length == 0}
        No results found...
    {:else}
        {#each filtered as student}
            <StudentItem {...student} />
        {/each}
    {/if}
</div>

<style>
    .displaybox {
        overflow-y: scroll;
    }
    .filter {
        display: flex;
        flex-direction: row;
    }
    .filter input {
        flex: 1;
    }
</style>
