function settingsPopup () {
    const settings = document.getElementById('settings');
    const settingsPopup = document.getElementById('settingsPopup');
    const cancelBtn = document.getElementById('settingsPopupCancel');
    const crossBtn = document.getElementById('closeSettingsPopUp');
    const settingsIcon = document.getElementById('settings-icon');
    const input = document.querySelectorAll('.settingsPopup__input');
    const eyes = document.querySelectorAll('.eye');

    eyes.forEach((eye) => {
        eye.addEventListener('click', () => {
            changeType(input);
        })
    })

    settings.addEventListener('click', () => {
        openPopup(settingsPopup);
    })
    settings.addEventListener('mouseenter', () => {
        settingsIcon.src = '../img/shestir_yellow.png';
    })
    settings.addEventListener('mouseleave', () => {
        settingsIcon.src = '../img/shestir_white.png';
    })
    
    cancelBtn.addEventListener('click', () => {
        closePopup(settingsPopup, clearInputs);
    });
    crossBtn.addEventListener('click', () => {
        closePopup(settingsPopup, clearInputs);
    });
    window.addEventListener('keyup', function (event) {
        exitOnEscape(event, settingsPopup);
    })
    settingsPopup.addEventListener('click', function (event) {
        handlePopupClick(event, settingsPopup)
    })
    function openPopup (element) {
        element.classList.remove('hideSettingsPopup');
    }
    function closePopup(element) {
        element.classList.add('hideSettingsPopup');
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
            i.type = 'password';
        }
    }
    function changeType (input) {
        input.forEach((i) => {
            if (i.type === 'password') {
                i.type = 'text';
            } else if (i.type = 'text') {
                i.type = 'password';
            }
        })
    }
}
export default settingsPopup;