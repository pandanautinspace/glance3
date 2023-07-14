<script lang="ts">
    import StudentItem from "../../StudentItem.svelte";
import Profile from "./Profile.svelte";

    export let data;
</script>

<Profile {...(data.student)} />
<div class="roommates">
    {#each (data.roommates) as roommate}
    <StudentItem {...roommate} />
    {/each}
</div>

<style>
    .roommates {
        display: flex;
        flex-direction: row;
    }
</style>