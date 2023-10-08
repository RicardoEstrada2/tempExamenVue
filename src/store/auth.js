import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        apiKey: ref('45e22b2c11e62b1f9a6b97f12c2fbfb4'),
        token: null,
        response: null,
        session: null,
        isLoadingUser: false
    }),
    setup(){},
    getters: {},
    actions: {
        async submitForm(username, password) {
            this.isLoadingUser = false;
            const apiKey = '45e22b2c11e62b1f9a6b97f12c2fbfb4'
            const token = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`)
                .catch(error => console.log(error)).then(response => this.token = response.data)
            // console.log(token)


            const response = await this.validateWithLogin(apiKey, username, password, token);


            if (response){
                await this.createSessionWithLogin(apiKey, username, password, token);
            }
            sessionStorage.setItem('sessionId', this.session.session_id)

            console.log(this.session.session_id)
            this.isLoadingUser = true
        },
        async validateWithLogin(apiKey, username, password, token){
            return await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
                {
                    username: username,
                    password: password,
                    request_token: token.request_token
                }
                , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(error => console.log(error))
                .then(r => this.session = r.data);
        },
        async createSessionWithLogin(apiKey, username, password, token){
            console.log('creating session')

            return await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
                {
                    username: username,
                    password: password,
                    request_token: token.request_token
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(r => {
                this.session = r.data
            })
            .catch(error => console.log(error));
        }
    }
})