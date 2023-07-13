<script lang="ts">
    let f = async () => {
        let rows: string[] = [];
        let res = await fetch("/stud_directory.csv");
        let t = await res.text();
        t.split("\n").forEach((item) => {
            rows.push(item);
        });
        console.log(t);
        return rows;
    };
</script>

{#await f()}
    Loading data...
{:then rows}
    {#each rows as row}
        <p>{row}</p>
    {/each}
{/await}
