import { Configuration, OpenAIApi } from "openai";
import transformWordsStringToArray from "./helpers/transformWordsStringToArray";

const getSynonyms = async (word, text, apiKey) => {
    const configuration = new Configuration({
        apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `français synonymes ${word.toUpperCase()} liste mots séparée virgule`,
    //     temperature: 0.05,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 1,
    //     presence_penalty: 0,
    // });

    // const response = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: "Hello world" }],
    // });

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `exemple:
              mot:arrêta texte:il s'arrêta à
              réponse:
              il stoppa à§il s’interrompit à§il s'immobilisa à§il se figea à§

              exemple:
              mot:prairie texte:la prairie verte
              réponse:
              le champ vert§le pré vert§le gazon vert§le pâturage vert§la pelouse verte§`,
            },
            { role: "user", content: `test : mot:${word} texte:${text}` },
        ],
        temperature: 1,
        max_tokens: 256,
        // top_p: 1,
        frequency_penalty: 0.5,
        // presence_penalty: 0.5,
    });

    // todo : log prompt and responses

    return transformWordsStringToArray(
        response.data.choices[0].message.content
    );
};

export default getSynonyms;
