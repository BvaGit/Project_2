import '../scss/style.scss';

import { clearAllPopup, handleLanguage, logout, settingsPopup, themeHandler } from '../modules/main-page/index'
import  registration  from '../modules/registration';
import sortData from '../modules/main-page/sortData'
import authorization from '../modules/auth';
import main from '../modules/main';
import controlPanelValidation from "../modules/main-page/controlPanelValidation";
import checkCookie from "../modules/main-page/ripCookie"
import inputsControl from '../modules/main-page/inputsControl';

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/main.html') {
        main();
        settingsPopup();
        clearAllPopup();
        logout();
        themeHandler();
        handleLanguage();
        sortData();
        controlPanelValidation();
        checkCookie()
        inputsControl();
    }
    else if (window.location.pathname === '/regpage.html') {
        registration();
    }
    else if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        authorization();
    }
});
  