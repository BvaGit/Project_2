import  supportMain  from './supportMain';

export default function settingsPopup () {
    const settings = document.getElementById('settings');
    const settingsPopup = document.getElementById('settingsPopup');
    const cancelBtn = document.getElementById('settingsPopupCancel');
    const crossBtn = document.getElementById('closeSettingsPopUp');
    const settingsIcon = document.getElementById('settings-icon');
    const clear = document.querySelectorAll('[data-clear]');
    const input = document.querySelectorAll('.settingsPopup__input');
    const eyes = document.querySelectorAll('.eye');

    eyes.forEach((eye) => {
        eye.addEventListener('click', () => {
            supportMain.changeType(input);
        })
    })
    settings.addEventListener('click', () => {
        supportMain.openPopup(settingsPopup, 'hideSettingsPopup');
    });
    settings.addEventListener('mouseenter', () => {
        settingsIcon.src = '../img/shestir_yellow.png';
    })
    settings.addEventListener('mouseleave', () => {
        settingsIcon.src = '../img/shestir_white.png';
    })
    
    cancelBtn.addEventListener('click', () => {
        supportMain.closePopup(settingsPopup, 'hideSettingsPopup');
        supportMain.clearInputs(clear);
    });
    crossBtn.addEventListener('click', () => {
        supportMain.closePopup(settingsPopup, 'hideSettingsPopup');
        supportMain.clearInputs(clear);
    });
    window.addEventListener('keyup', function (event) {
        supportMain.exitOnEscape(event, settingsPopup, 'hideSettingsPopup');
    })
    settingsPopup.addEventListener('click', function (event) {
        supportMain.handlePopupClick(event, settingsPopup, 'hideSettingsPopup')
    })
}