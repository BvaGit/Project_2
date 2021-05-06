
function createPopup () {
    const create = document.getElementById('create');
    const createPopup = document.getElementById('createPopup');
    const cancelBtn = document.getElementById('createPopupCancel');
    const crossBtn = document.getElementById('closeCreatePopUp');
    // const inputWrapper = document.getElementById('createPopupInputWrapper');
    const input = document.querySelectorAll('.createPopup__input');

    create.addEventListener('click', () => {
        openPopup(createPopup);
    })
    cancelBtn.addEventListener('click', () => {
        closePopup(createPopup, clearInputs);
    });
    crossBtn.addEventListener('click', () => {
        closePopup(createPopup, clearInputs);
    });
    window.addEventListener('keyup', function (event) {
        exitOnEscape(event, createPopup, clearInputs);
        
    })
    createPopup.addEventListener('click', function (event) {
        handlePopupClick(event, createPopup);
    })
    function openPopup (element) {
        element.classList.remove('hideCreatePopup');
    }
    function closePopup(element) {
        element.classList.add('hideCreatePopup');
        clearInputs(input);
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
    function clearInputs (input) {
        if (!input) {
            return;
        }
        for (let i of input) {
            i.value = '';
        }
    }
}
export default createPopup;