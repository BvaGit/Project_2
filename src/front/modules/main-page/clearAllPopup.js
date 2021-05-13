import  supportMain  from '../main-page/supportMain';

export default function clearAllPopup () {
    const clearAll = document.getElementById('clearAll');
    const clearAllPopup = document.getElementById('clearAllPopup');
    const cancelBtn = document.getElementById('clearAllPopupCancel');
    const crossBtn = document.getElementById('closeClearAllPopUp');

    clearAll.addEventListener('click', () => {
        supportMain.openPopup(clearAllPopup, 'hideClearAllPopup');
    })
    cancelBtn.addEventListener('click', () => {
        supportMain.closePopup(clearAllPopup, 'hideClearAllPopup', );
    });
    crossBtn.addEventListener('click', () => {
        supportMain.closePopup(clearAllPopup, 'hideClearAllPopup');
    });
    window.addEventListener('keyup', function (event) {
        supportMain.exitOnEscape(event, clearAllPopup, 'hideClearAllPopup')
    })
    clearAllPopup.addEventListener('click', function (event) {
        supportMain.handlePopupClick(event, clearAllPopup, 'hideClearAllPopup')
    })
}