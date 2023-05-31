// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";
import getSynonyms from "../../../apiServices/getSynonyms";

export async function GET(request, { params }) {
    const { word } = params;

    try {
        const synonyms = await getSynonyms(word);
        return NextResponse.json({ synonyms });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error getting synonyms" },
            { status: 500 }
        );
    }
}
