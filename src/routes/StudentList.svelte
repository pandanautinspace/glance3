<script lang="ts">
    import StudentItem from "./StudentItem.svelte";
    import type { Student } from "$lib/types";
    export let students: Student[];
    let searchString = "";
    console.log(students);
    $: filter = (students: Student[]) => {
        let re = new RegExp(searchString, "i")
        return students.filter(x => x["name"].search(re) != -1);
    };

    $: filtered = filter(students);
    
</script>

<input type="text" bind:value={searchString}/>
<div class="displaybox">
    {#if filtered.length == 0}
    No results found...
    {:else}
    {#each filtered as student}
        <StudentItem {...student}/>
    {/each}
    {/if}
</div>

<style>
    .displaybox {
        overflow-y: scroll;
    }
</style>
