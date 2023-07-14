<script lang="ts">
    export let name: string;
    export let year: string;
    export let address: string;
    export let mailbox: string;
    export let ho_city: string;
    export let ho_state: string;
    export let email: string;
    export let studying_abroad: string = "No";
</script>

<h2>
    {name}
</h2>
<h3>{year}</h3>
{address}, {mailbox}
<div>
    {ho_city}, {ho_state}
</div> 
<a href="mailto:{email}"> {email}</a>