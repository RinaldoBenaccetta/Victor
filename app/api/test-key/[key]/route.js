// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

export async function GET(request, { params }) {
    const { key } = params;

    const configuration = new Configuration({
        apiKey: key,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-ada-001",
            prompt: "hello",
            temperature: 1,
            max_tokens: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return NextResponse.json({ message: "Key is valid" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error testing the key" },
            { status: 400 }
        );
    }
}
