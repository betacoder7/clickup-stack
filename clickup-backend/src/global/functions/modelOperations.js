const findOne = async (model, key, value) => {
    const result = await model.findOne({
        where: {
            [key]: value,
        }
    });

    return result;
};

const update = async (model, key, value, body) => {
    const result = await model.update(body, {
        where: {
            [key]: value,
        }
    });

    return result;
};

const destroy = async (model, key, value) => {
    const result = await model.destroy({
        where: {
            [key]: value,
        }
    });

    return result;
};

export { findOne, update, destroy };