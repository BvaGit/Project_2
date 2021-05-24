import  supportMain  from './supportMain';
import  ChangeCreds  from '../main-page/changeCreds';

export default function settingsPopup () {
    const settings = document.getElementById('settings');
    const settingsPopup = document.getElementById('settingsPopup');
    const cancelBtn = document.getElementById('settingsPopupCancel');
    const crossBtn = document.getElementById('closeSettingsPopUp');
    const settingsIcon = document.getElementById('settings-icon');
    const clear = document.querySelectorAll('[data-clear]');
    const show = document.querySelectorAll('[data-show]');
    const eyes = document.querySelectorAll('.eye');
    const popupClass = 'hideSettingsPopup';

    const settingsPopupConfirm = document.getElementById('settingsPopupConfirm');

    settingsPopupConfirm.addEventListener("click", ChangeCreds)

    const closePopup = () => {
        supportMain.closePopup(settingsPopup, popupClass);
        supportMain.clearInputs(clear);
        supportMain.resetPasswordType(show);
    };

    settings.addEventListener('mouseenter', () => {
        settingsIcon.src = '../img/shestir_yellow.png';
    })
    settings.addEventListener('mouseleave', () => {
        settingsIcon.src = '../img/shestir_white.png';
    })
    settings.addEventListener('click', () => {
        supportMain.openPopup(settingsPopup, popupClass);
    })
    cancelBtn.addEventListener('click', () => {
        closePopup();
    })
    crossBtn.addEventListener('click', () => {
        closePopup();
    })
    window.addEventListener('keyup', function (event) {
        if (supportMain.isEscapeKey(event)) {
            closePopup();
        }
    })
    settingsPopup.addEventListener('click', function (event) {
        if (event.target === settingsPopup) {
            closePopup();
        }
    })
    eyes.forEach((eye) => {
        eye.addEventListener('click', () => {
            supportMain.changeType(show);
        })
    })
}