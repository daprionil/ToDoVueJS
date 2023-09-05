//Set storage value
const setStorageValue = (name, value) => {
    localStorage.setItem(name, value);
};

const getStorageValue = (name) => {
    return JSON.parse(localStorage.getItem(name));
}

export {
    setStorageValue,
    getStorageValue
}