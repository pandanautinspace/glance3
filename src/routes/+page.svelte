<script lang="ts">
    import type { Student } from "$lib/types";
    export let data;
    import StudentList from "./StudentList.svelte";
    let students: Student[] = data.students;
</script>

<StudentList {students} />

<style>
</style>
