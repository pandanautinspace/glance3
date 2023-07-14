import type { Student } from "$lib/types";

export async function load({ fetch, params }) {
    let res = await fetch(`/api/student/${params.mailbox}`);
    let student : Student = await res.json();
    let res2 = await fetch(`/api/roommates/${student.address}`)
    return {
        student: student,
        roommates: await res2.json()
    };
}