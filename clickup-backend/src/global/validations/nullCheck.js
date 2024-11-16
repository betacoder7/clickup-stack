const nullCheck = (body, { nonNullableFields, mustBeNullFields, bothCannotBeNull }) => {
    emptyCheck(body);
    if (nonNullableFields !== undefined) {
        for (let i = 0; i < nonNullableFields.length; i++) {
            let field = nonNullableFields[i];

            if (typeof (field) == 'object') {
                const name = field.name;
                const type = field.type;


                if (body[name] === undefined) {
                    throw Error(`NotNull Violation ${name} cannot be null`);
                }

                if (body[name] instanceof Array) {
                    for (let i = 0; i < body[name].length; i++) {
                        const blobType = body[name][i].type.split('/')[0];

                        if (blobType !== type) {
                            throw Error(`InvalidInput Violation ${name}[${i}] must be ${type}`);
                        }
                    }
                }
                else {
                    const blobType = body[name].type.split('/')[0];

                    if (blobType !== type) {
                        throw Error(`InvalidInput Violation ${name} must be ${type}`);
                    }
                }
            }
            else if (field.includes(".")) {
                let fields = field.split(".");

                if (body[fields[0]] === undefined) {
                    throw Error(`NotNull Violation ${fields[0]} cannot be null`);
                }

                if (body[fields[0]].length == 0) {
                    throw Error(`NotNull Violation ${fields[0]} cannot be empty`);
                }

                for (let i = 0; i < body[fields[0]].length; i++) {
                    const item = body[fields[0]][i];
                    if (item[fields[1]] === undefined) {
                        throw Error(`notNull Violation: ${field} cannot be null`);
                    }
                }
            }
            else if (body[field] === undefined) {
                throw Error(`notNull Violation: ${field} cannot be null`);
            }
        }
    }
    if (mustBeNullFields !== undefined) {
        for (let i = 0; i < mustBeNullFields.length; i++) {
            let field = mustBeNullFields[i];
            if (field.includes(".")) {
                let fields = field.split(".");

                if (body[fields[0]] === undefined) {
                    throw Error(`NotNull Violation ${fields[0]} cannot be null`);
                }

                if (body[fields[0]].length == 0) {
                    throw Error(`NotNull Violation ${fields[0]} cannot be empty`);
                }

                for (let i = 0; i < body[fields[0]].length; i++) {
                    const item = body[fields[0]][i];
                    if (item[fields[1]] !== undefined) {
                        throw Error(`mustBeNull Violation: ${field} must be null`);
                    }
                }
            }
            else if (body[field] !== undefined) {
                throw Error(`mustBeNull Violation: ${field} must be null`);
            }
        }
    }
    if (bothCannotBeNull !== undefined) {
        for (let i = 0; i < bothCannotBeNull.length; i++) {
            let field = bothCannotBeNull[i];
            if (body[field] !== undefined) {
                break;
            }

            if (body[field] === undefined && i == bothCannotBeNull.length - 1) {
                throw Error(`notNull Violation: all fields in ${bothCannotBeNull} can't be null`);
            }
        }
    }
};

const emptyCheck = (body) => {
    if (body == null) {
        throw Error('Found empty body');
    }
};

const defaultNullFields = ['id', 'uuid', 'createdAt', 'updatedAt'];

export {
    nullCheck,
    emptyCheck,
    defaultNullFields
};