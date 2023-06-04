// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";
import getSynonyms from "../../../apiServices/getSynonyms";

export async function GET(request, { params }) {
    const { word } = params;

    const apiKey = request.headers.get("authorization");

    try {
        const synonyms = await getSynonyms(word, apiKey);
        return NextResponse.json({ synonyms });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error getting synonyms" },
            { status: 500 }
        );
    }
}
