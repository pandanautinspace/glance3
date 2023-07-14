import { asObj, getRoommates } from "$lib/studentDB";

export function GET({ params }) {
    return new Response(JSON.stringify(getRoommates(params.room)));
}