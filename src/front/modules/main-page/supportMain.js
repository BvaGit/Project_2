const supportMain = {
    openPopup (element, cls) {
        element.classList.remove(cls);
    },
    closePopup(element, cls, inp) {
        element.classList.add(cls);
        this.clearInputs(inp);
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
    clearInputs (input) {
        if (!input) {
            return;
        }
        for (let i of input) {
            i.value = '';
            i.type = 'password';
        }
    },
    changeType (inpt) {
        inpt.forEach((i) => {
            if (i.type === 'password') {
                i.type = 'text';
            } else if (i.type = 'text') {
                i.type = 'password';
            }
        })
    }
}

export default supportMain;