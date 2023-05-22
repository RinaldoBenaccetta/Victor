export default async (req, res) => {
    const {
        query: { word },
    } = req;

    if (!word) {
        res.status(400).json({ error: "No word provided" });

        return;
    }

    // TODO: Fetch the actual synonyms for the word from openai
    const synonyms = ["mot1", "mot2", "mot3"];

    res.status(200).json({ word, synonyms });
};
