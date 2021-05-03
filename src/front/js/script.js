import '../scss/style.scss';

import hello from '../modules/hello';
import settingsPopup from '../modules/settingsPopup';

window.addEventListener('DOMContentLoaded', ()=>{
    hello();
    settingsPopup();
});