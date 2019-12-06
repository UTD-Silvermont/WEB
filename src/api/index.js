import ajax from "./ajax";

/*
    Login handler, call ajax method:
*/
export const reqLogin = (username, password) => ajax('http://localhost:3300/user/login', { 
        "username": username, 
        "password": password
    }, 'POST');

/*
    Register handler, call ajax method:
*/
export const reqAddUser = (user) => ajax('./manage/user/add', user, 'POST');

/*
    Get info from DB to render profile:
*/
export const reqProfile = (username) => ajax('http://localhost:3300/user/profile', {
        "username": username
    }, 'GET');

/*
    New User register: 
*/
export const reqReg = (username, password, email, address) => ajax('http://localhost:3300/user/register', 
    {
        "username": username, 
        "password": password, 
        "email": email, 
        "address": address
    }, 'POST');

/*
    Log out:
*/
export const reqLogout = (username) => ajax('http://localhost:3300/user/logout',
    {
        "username": username,
    }, 'POST');
