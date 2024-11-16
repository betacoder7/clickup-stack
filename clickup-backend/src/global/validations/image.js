const validateImage = (file, fieldName, type) => {
    if (typeof (file) != 'object') {
        throw Error(`InvalidInput Violation ${fieldName} must be ${type}`);
    }

    const mtype = file.type.split('/')[0];

    if (mtype != type) {
        throw Error(`InvalidInput Violation ${fieldName} must be ${type}`);
    }
};

const validateImages = (files, fieldName, type) => {
    if (!Array.isArray(files)) {
        throw Error(`InvalidInput Violation ${fieldName} must be ${type}`);
    }

    for (let i = 0; i < files.length; i++) {
        validateImage(files[i], fieldName, type);
    }
};

export { validateImage, validateImages };