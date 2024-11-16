const getQueries = (res, queries) => {
    const data = {};

    Object.keys(queries).map((query) => {
        const defaultVal = queries[query];
        if (typeof (res[query]) == "undefined") {
            data[query] = defaultVal;
        }
        else {
            data[query] = res[query][0];
        }
    });

    return data;
};

export default getQueries;