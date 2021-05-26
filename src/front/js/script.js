import '../scss/style.scss';

import hello from '../modules/hello';
import { clearAllPopup, handleLanguage, logout, settingsPopup, themeHandler } from '../modules/main-page/index'
import  registration  from '../modules/registration';
import sortData from '../modules/main-page/sortData'
import authorization from '../modules/auth';
import main from '../modules/main';
import controlPanelValidation from "../modules/main-page/controlPanelValidation";
import inputsControl from '../modules/main-page/inputsControl';

window.addEventListener('DOMContentLoaded', () => {
    hello();
    if (window.location.pathname === '/main.html') {
        main();
        settingsPopup();
        clearAllPopup();
        logout();
        themeHandler();
        handleLanguage();
        sortData();
        controlPanelValidation();
        inputsControl();
    }
    else if (window.location.pathname === '/regpage.html') {
        registration();
    }
    else if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        authorization();
    }
  });
  