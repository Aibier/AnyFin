import { config } from '../config';
import { authHeader } from '../helpers';

export const authService = {
    login,
    logout,
    register,
    getCountries,
    getCountryByName
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    console.log(requestOptions);

    return fetch(`${config.apiUrl}auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getCountries() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}countries`, requestOptions).then(handleResponse);
}

function getCountryByName(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/countries/${name}`, requestOptions).then(handleResponse);
}

function register(user) {
    const userData = {
        name: `${user.firstName} ${user.lastName}`,
        password: user.password,
        email: user.email
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch(`${config.apiUrl}auth/register`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    }).catch(e => Promise.reject(e));
}