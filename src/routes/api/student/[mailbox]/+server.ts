import { asObj } from "$lib/studentDB";

export function GET({ params }) {
    return new Response(JSON.stringify(asObj()[params.mailbox]));
}