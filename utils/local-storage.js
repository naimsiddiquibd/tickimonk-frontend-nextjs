export const setLocalStorage = (key, token ) => {
    if(!key || typeof window === "undefined"){
        return "";
    }
    return localStorage.setItem(key, token);
};