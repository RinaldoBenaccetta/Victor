import axios from "axios";

export const getAntonyms = async (selectedText, apiKey) => {
    try {
        const res = await axios.get(`/api/get-antonyms/${selectedText}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = res.data;

        return data.antonyms;
    } catch (error) {
        console.error(error);

        return null;
    }
};
