import '../scss/style.scss';

import hello from '../modules/hello';
import settingsPopup from '../modules/settingsPopup';
import clearAllPopup from '../modules/clearAllPopup';
import logout from '../modules/logout';
import themeHandler from '../modules/themeHandler';
import deletePerson from '../modules/deletePerson';
import handleLanguage from '../modules/handleLanguage';

window.addEventListener('DOMContentLoaded', () => {
    hello();
    if (window.location.pathname === '/main.html') {
        settingsPopup();
        clearAllPopup();
        logout();
        themeHandler();
        deletePerson();
        handleLanguage();
    }
    else if (window.location.pathname === '/regpage.html') {
        console.log('тут будут скрипты для страницы регистрации')
    }
    else if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        console.log('тут будут скрипты для страницы авторизации')
    }
  })