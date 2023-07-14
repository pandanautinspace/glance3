import { asList, asObj } from "$lib/studentDB";

export function GET() {
    return new Response(JSON.stringify(asList()));
}