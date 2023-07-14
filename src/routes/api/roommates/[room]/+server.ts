import { asObj, getRoommates } from "$lib/studentDB";

export function GET({ params }) {
    console.log(params.room);
    return new Response(JSON.stringify(getRoommates(params.room)));
}