export const getFromLS = (storage) => {
    const item = localStorage.getItem(storage);
    return item ? JSON.parse(item) : null;
};

export const addToLS = (storage, data) => {
    return localStorage.setItem(storage, JSON.stringify(data));
};

export const removeFromLS = (storage) => {
    return localStorage.removeItem(storage);
};

export const clearLS = () => {
    return localStorage.clear();
};
