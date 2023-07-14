export async function load({fetch}) {
    let all = await fetch('/api/allstudents');
    let students = await all.json();
    return {
        students
    };
}