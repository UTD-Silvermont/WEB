import ajax from "./ajax";

/*
    Login handler, call ajax method:
*/
export const reqLogin = (username, password) => ajax('http://localhost:3000/user/login', {username, password}, 'POST');

/*
    Register handler, call ajax method:
*/
export const reqAddUser = (user) => ajax('./manage/user/add', user, 'POST');