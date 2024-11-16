const processBody = (body) => {
    const myBody = {};
    Object.keys(body).map((key) => {
        if (key.includes('[')) {
            const field = key.split('[')[0].split(']')[0];

            myBody[field] = [
                ...(myBody[field] ?? []),
                body[key],
            ];
        }
        else {
            myBody[key] = body[key];
        }
    });

    return myBody;
};

export default processBody;