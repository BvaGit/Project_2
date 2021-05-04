function clearAllPopup () {
    const clearAll = document.getElementById('clearAll');
    const clearAllPopup = document.getElementById('clearAllPopup');
    const cancelBtn = document.getElementById('clearAllPopupCancel');
    const crossBtn = document.getElementById('closeClearAllPopUp');

    clearAll.addEventListener('click', () => {
        openPopup(clearAllPopup);
    })
    cancelBtn.addEventListener('click', () => {
        closePopup(clearAllPopup);
    });
    crossBtn.addEventListener('click', () => {
        closePopup(clearAllPopup);
    });
    window.addEventListener('keyup', function (event) {
        exitOnEscape(event, clearAllPopup)
    })
    clearAllPopup.addEventListener('click', function (event) {
        handlePopupClick(event, clearAllPopup)
    })
    function openPopup (element) {
        element.classList.remove('hideClearAllPopup');
    }
    function closePopup(element) {
        element.classList.add('hideClearAllPopup');
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
export default clearAllPopup;