import localforage from "localforage";

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'AppState',
    description: 'This is cache storage',
    version: '1.0',
    storeName: 'app_state',
});

const get = async (key) => {
    const item = await localforage.getItem(key);
    return item;
};

const set = async (key, data) => {
    await localforage.setItem(key, data);
};

const remove = async (key) => {
    await localforage.removeItem(key);
};

const removeAll = async () => {
    await localforage.clear();
};

export { get, set, remove, removeAll };