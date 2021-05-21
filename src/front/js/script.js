import '../scss/style.scss';

import hello from '../modules/hello';
import { clearAllPopup, deletePerson, handleLanguage, logout, settingsPopup, supportMain, themeHandler } from '../modules/main-page/index'
import  registration  from '../modules/registration';
import sortData from '../modules/main-page/sortData'

window.addEventListener('DOMContentLoaded', () => {
    hello();
    if (window.location.pathname === '/main.html') {
        settingsPopup();
        clearAllPopup();
        logout();
        themeHandler();
        deletePerson();
        handleLanguage();
        sortData();
    }
    else if (window.location.pathname === '/regpage.html') {
        console.log('тут будут скрипты для страницы регистрации')
        registration();
    }
    else if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        console.log('тут будут скрипты для страницы авторизации')
    }
  })