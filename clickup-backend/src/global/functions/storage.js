import { unlink } from "node:fs/promises";

const writeFile = async (name, folder, blob) => {
    const type = blob.type;
    const extension = type.split('/')[1];

    await Bun.write(`./static/${folder}/${name}.${extension}`, blob);

    return `${folder}/${name}.${extension}`;
};

const updateFile = async (filePath, blob, name, folder) => {
    destroyFile(filePath);

    return await writeFile(name, folder, blob);
};

const destroyFile = async (filePath) => {
    await unlink(`./static/${filePath}`);
};

export { writeFile, destroyFile, updateFile };