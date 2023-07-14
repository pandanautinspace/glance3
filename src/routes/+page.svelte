<script lang="ts">
    let f = async () => {
        let rows: string[] = [];
        let res = await fetch("/stud_directory.csv");
        let t = await res.text();
        t.split("\n").forEach((item) => {
            let comma_sep = item.split(",").map(x => x.trim()).filter(x => x!="").reduce((acc, current) => {
                console.log(acc.state);
                if(current[0] == '"' && acc.state == 'close') {
                    acc.state = 'open';
                    acc.items.push(current.slice(1));
                }
                else if(current[current.length - 1] == '"' && acc.state == 'open') {
                    acc.state = 'close';
                    acc.items[acc.items.length - 1] += ', ' + current.slice(0, current.length - 1);
                }
                else if(acc.state == 'close') {
                    acc.items.push(current);
                }
                else if(acc.state == 'open') {
                    acc.items[acc.items.length - 1] += ', ' + current;
                }
                return acc;
            }, {
                state: 'close',
                items: ['']
            });
            rows.push(comma_sep.items.join(' '));
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
