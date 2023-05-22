// export default async (req, res) => {
//     const {
//         query: { word },
//     } = req;

// import { NextResponse } from "next/server";

//     if (!word) {
//         res.status(400).json({ error: "No word provided" });

//         return;
//     }

//     // TODO: Fetch the actual synonyms for the word from openai
//     const synonyms = ["mot1", "mot2", "mot3"];

//     res.status(200).json({ word, synonyms });
// };

// export async function GET(request) {
//     console.log("request : ", request);
//     // TODO: Fetch the actual synonyms for the word from openai
//     const synonyms = ["mot1", "mot2", "mot3"];

//     return new Response.json({ synonyms: synonyms });
//     // return new Response("hello");
// }

// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    console.log("searchParams : ", searchParams);

    //   const id = searchParams.get('id');

    return NextResponse.json({ test: "hello" });
}
