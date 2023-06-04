import axios from "axios";

export const getSynonyms = async (selectedText, apiKey) => {
    try {
        const res = await axios.get(`/api/get-synonyms/${selectedText}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = res.data;

        console.log("synonyms : ", data.synonyms);

        return data.synonyms;
    } catch (error) {
        console.error(error);

        return null;
    }
};
