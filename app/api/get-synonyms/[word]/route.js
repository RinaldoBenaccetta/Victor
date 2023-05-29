// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { word } = params;
    const synonyms = ["mot1", "mot2", "mot3"];

    return NextResponse.json({ synonyms: synonyms });
}
