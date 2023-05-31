const transformWordsStringToArray = apiResponse => {
    const responseString = apiResponse.data.choices[0].text;

    let responseArray = responseString.replace(".", "").split(",");
    responseArray = responseArray.map(item => item.trim().toLowerCase());

    // remove duplicates
    responseArray = [...new Set(responseArray)];

    return responseArray;
};

export default transformWordsStringToArray;
