function settingsPopup () {
    const settings = document.getElementById('settings');
    const settingsPopup = document.getElementById('settingsPopup');
    const cancelBtn = document.getElementById('settingsPopupCancel');
    const crossBtn = document.getElementById('closeSettingsPopUp');

    settings.addEventListener('click', () => {
        openPopup(settingsPopup);
    })
    cancelBtn.addEventListener('click', () => {
        closePopup(settingsPopup);
    });
    crossBtn.addEventListener('click', () => {
        closePopup(settingsPopup);
    });
    window.addEventListener('keyup', function (event) {
        exitOnEscape(event, settingsPopup)
    })
    settingsPopup.addEventListener('click', function (event) {
        handlePopupClick(event, settingsPopup)
    })
    function openPopup (element) {
        element.classList.remove('hideSettingsPopup');
    }
    function closePopup(element) {
        element.classList.add('hideSettingsPopup');
    }
    function exitOnEscape(event, element) {
        if (event.keyCode === 27) {
          closePopup(element);
        }
    }
    function handlePopupClick(event, element) {
        if (event.target === element) {
          closePopup(element);
        }
    }
}
export default settingsPopup;