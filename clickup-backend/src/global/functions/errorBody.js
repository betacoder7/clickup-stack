const errorBody = (message) => {
    const initialBody = { error: true };

    if (message.includes("\n")) {
        const messages = message.split("\n");

        return { ...initialBody, multiple: true, res: messages };
    }

    return { ...initialBody, res: message };
};

export { errorBody };