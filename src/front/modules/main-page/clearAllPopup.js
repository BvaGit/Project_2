import  supportMain  from '../main-page/supportMain';

export default function clearAllPopup() {
    const clearAll = document.getElementById('clearAll');
    const clearAllPopup = document.getElementById('clearAllPopup');
    const cancelBtn = document.getElementById('clearAllPopupCancel');
    const crossBtn = document.getElementById('closeClearAllPopUp');
    const popupClass = 'hideClearAllPopup';
    const clearAllPopupConfirm = document.querySelector("#clearAllPopupConfirm");

    clearAll.addEventListener('click', () => {
        supportMain.openPopup(clearAllPopup, popupClass);
    });
    clearAllPopupConfirm.addEventListener("click", () => {
        supportMain.closePopup(clearAllPopup, popupClass);
    });
    cancelBtn.addEventListener('click', () => {
        supportMain.closePopup(clearAllPopup, popupClass);
    });
    crossBtn.addEventListener('click', () => {
        supportMain.closePopup(clearAllPopup, popupClass);
    });
    window.addEventListener('keyup', function (event) {
        supportMain.exitOnEscape(event, clearAllPopup, popupClass);
    })
    clearAllPopup.addEventListener('click', function (event) {
        supportMain.handlePopupClick(event, clearAllPopup, popupClass);
    })
}