// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";
import getAntonyms from "../../../apiServices/getAntonyms";

export async function GET(request, { params }) {
    const { word } = params;

    const apiKey = request.headers.get("authorization");

    try {
        const antonyms = await getAntonyms(word, apiKey);
        return NextResponse.json({ antonyms });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error getting antonyms" },
            { status: 500 }
        );
    }
}
