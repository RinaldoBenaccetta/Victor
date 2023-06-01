import { Configuration, OpenAIApi } from "openai";
import transformWordsStringToArray from "./helpers/transformWordsStringToArray";

const getSynonyms = async word => {
    // todo : get api key from frontend
    const configuration = new Configuration({
        apiKey: "",
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `français synonymes ${word.toUpperCase()} liste mots séparée virgule`,
        temperature: 0.05,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 0,
    });

    // todo : log prompt and responses

    return transformWordsStringToArray(response);
};

export default getSynonyms;
