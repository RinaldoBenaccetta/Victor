import axios from "axios";

export const getSynonyms = async selectedText => {
    try {
        const res = await axios.get(`/api/get-synonyms/${selectedText}`);
        const data = res.data;

        console.log(data.synonyms);
    } catch (error) {
        console.error(error);
    }
};
