const supportMain = {
    openPopup(element, cls) {
        element.classList.remove(cls);
    },
    closePopup(element, cls) {
        element.classList.add(cls);
    },
    isEscapeKey(event) {
        return event.keyCode === 27;
    },
    exitOnEscape(event, element, cls) {
        if (event.keyCode === 27) {
          this.closePopup(element, cls);
        }
    },
    handlePopupClick(event, element, cls) {
        if (event.target === element) {
          this.closePopup(element, cls);
        }
    },
    clearInputs(input) {
        if (!input) {
            return;
        }
        for (let i of input) {
            i.value = '';
        }
    },
    changeType(inputs) {
        inputs.forEach((i) => {
            if (i.type === 'password') {
                i.type = 'text';
            } else if (i.type === 'text') {
                i.type = 'password';
            }
        })
    },
    resetPasswordType(inputs) {
        inputs.forEach(input => {
            input.type = 'password';
        });
    }
}
export default supportMain;
