import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        // username: 'fenrill',
        // password: '1234'

    }),
    getters:{
    },
    actions:{
        submitForm,
        createRequestToken,
        validateWithLogin,
        createSession
    }
})

async function submitForm(e) {
    e.preventDefault();
    const requestToken = await createRequestToken();
    const validated = await validateWithLogin(requestToken);
    if (validated) {
        const sessionId = await createSession(requestToken);
        // console.log(sessionId);
        sessionStorage.setItem('sessionId', sessionId);
        window.location.href = 'movies.html';
    }
}

async function createRequestToken() {
    const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);
    const data = await response.json();
    return data.request_token;
}

async function validateWithLogin(requestToken) {
    const response = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: this.username,
            password: this.password,
            request_token: requestToken
        })
    });
    const data = await response.json();
    return data.success;
}

async function createSession(requestToken) {
    const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request_token: requestToken
        })
    });
    const data = await response.json();
    return data.session_id;
}