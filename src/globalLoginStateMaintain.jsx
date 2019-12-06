import React, { Component } from 'react';

const globalUserState = {
    username: '',
}

const stockSym = {
    symbol: '',
}

const stockMax = {
    max: 0,
}

/*
    Log in user 
*/
export const setGlobalUser = (username) => {
    globalUserState.username = username;
}

export const getGlobalUser = () => {
    return globalUserState.username;
}

/*
    Stock symbol
*/
export const setStockSym = (symbol) => {
    stockSym.symbol = symbol;
}

export const getStockSym = () => {
    return stockSym.symbol;
}

/*
    Stock max
*/

export const setStockMax = (max) => {
    stockMax.max = max;
}

export const getStockMax = () => {
    return stockMax.max;
}

/*
    Clear when log out:
*/

export const clear = () => {
    globalUserState.username = '';
    stockSym.symbol = '';
    stockMax.max = 0;
}

/*
    Check if already logged in:
*/
export const isLoggedIn = () => {
    return (globalUserState !== '');
}