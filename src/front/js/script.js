import '../scss/style.scss';

import hello from '../modules/hello';
import settingsPopup from '../modules/settingsPopup';
import createPopup from '../modules/createPopup';
import clearAllPopup from '../modules/clearAllPopup';
import logout from '../modules/logout';

window.addEventListener('DOMContentLoaded', () => {
    hello();
    if (window.location.pathname === '/main.html') {
        settingsPopup();
        createPopup();
        clearAllPopup();
        logout();
    }
    else if (window.location.pathname === '/regpage.html') {
        console.log('тут будут скрипты для страницы регистрации')
    }
    else if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        console.log('тут будут скрипты для страницы авторизации')
    }
  })