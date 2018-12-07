import React from 'react';
import decode from 'jwt-decode';
import request from './Shared/request';

export default class AuthService {
    constructor(props){
        this.login = this.login.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    login(username, password) {
       // alert(username + password);
        return request({
            url : `/api/account/login`,
            method : "POST",
            data : {
                    username,
                    password
                }
                }).then( res => {
                    this.setToken(res.token)
                    return Promise.resolve(res);
                })
    }

    signUp(newUser){
        return request({
            url : `/api/account/signup`,
            method : "POST",
            data : {
                    newUser,
                }
                }).then( res => {
                    this.setToken(res.token)
                    return Promise.resolve(res);
                })
    }
    

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token');
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}