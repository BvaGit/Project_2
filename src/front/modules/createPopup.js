function createPopup () {
    const create = document.getElementById('create');
    const createPopup = document.getElementById('createPopup');
    const cancelBtn = document.getElementById('createPopupCancel');
    const crossBtn = document.getElementById('closeCreatePopUp');

    create.addEventListener('click', () => {
        openPopup(createPopup);
    })
    cancelBtn.addEventListener('click', () => {
        closePopup(createPopup);
    });
    crossBtn.addEventListener('click', () => {
        closePopup(createPopup)
    });
    window.addEventListener('keyup', function (event) {
        exitOnEscape(event, createPopup)
    })
    createPopup.addEventListener('click', function (event) {
        handlePopupClick(event, createPopup)
    })
    function openPopup (element) {
        element.classList.remove('hideCreatePopup');
    }
    function closePopup(element) {
        element.classList.add('hideCreatePopup');
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
export default createPopup;