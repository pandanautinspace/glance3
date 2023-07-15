<script lang="ts">
    import StudentItem from "./StudentItem.svelte";
    import { PieChart, type PieChartOptions } from "chartist";
    import 'chartist/dist/index.css';
    import type { Student } from "$lib/types";
    import { onMount } from "svelte";
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
    let firstLoadFinished = false;
    $: {
        if(firstLoadFinished) {
            let labels = filtered.map(s => s.ho_state).filter((v, i, a) => i == a.lastIndexOf(v));
        let series = labels.map(l => filtered.filter(v => v.ho_state == l).length);
        let p = new PieChart(".state-chart", {labels, series});
        }
    }
    onMount(() => {
        let labels = filtered.map(s => s.ho_state).filter((v, i, a) => i == a.lastIndexOf(v));
        let series = labels.map(l => filtered.filter(v => v.ho_state == l).length);
        let p = new PieChart(".state-chart", {labels, series});
        firstLoadFinished = true;
    })
    


    
</script>

{#each filters as _ (_.id)}
    <div class="state-chart" />
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
    .state-chart {
        height: 20vh;
    }
</style>
