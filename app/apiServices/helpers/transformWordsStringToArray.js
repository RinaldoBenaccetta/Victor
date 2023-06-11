const transformWordsStringToArray = responseString => {
    let responseArray = responseString.replace(".", "").split("§");
    responseArray = responseArray.map(item => item.trim().toLowerCase());

    // remove duplicates
    responseArray = [...new Set(responseArray)];

    return responseArray;
};

export default transformWordsStringToArray;
