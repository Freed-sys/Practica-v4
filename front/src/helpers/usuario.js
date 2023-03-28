const TOKEN_KEY = 'access_token';

const setToken = (access_token) => {
    localStorage.setItem(TOKEN_KEY, access_token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export {setToken,getToken,deleteToken}