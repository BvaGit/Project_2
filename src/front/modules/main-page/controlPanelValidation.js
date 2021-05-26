import { ServerValidator } from "../../../backend/service/ServerValidator";

const validationOnInputs = {
    validateName(input) {
        const inputValue = input.value;
        if (ServerValidator.NAME_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
        }
    },
    validateCity(input) {
        const inputValue = input.value;
        if (ServerValidator.CITY_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
        }
    },
    validateEmail(input) {
        const inputValue = input.value;
        if (ServerValidator.EMAIL_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
            input.placeholder = 'your-email@domain.com'
        }
    },
    validatePhone(input) {
        const inputValue = input.value;
        if (ServerValidator.EMAIL_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
            input.placeholder = '(xxx)-xxx-xxxx';
        }
    }, 
    validateAge(input) {
        const inputValue = input.value;
        if (inputValue > 0 && inputValue <= 123 && inputValue !== '') {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
        }
    }
}

export default function controlPanelValidation () {
    const cpInputs = document.querySelectorAll('.panel__input');
    cpInputs.forEach(cpinput => {
        cpinput.addEventListener('change', (e) => {
            const input = e.target;
            const inputName = e.target.name;
            switch (inputName) {
                case 'firstName':
                    validationOnInputs.validateName(input);
                    break;
                case 'lastName':
                    validationOnInputs.validateName(input);
                    break;
                case 'city':
                    validationOnInputs.validateCity(input);
                    break;
                case 'email':
                    validationOnInputs.validateEmail(input);
                    break;
                case 'phone':
                    validationOnInputs.validatePhone(input);
                    break;
                case 'age':
                    validationOnInputs.validateAge(input);
                    break;
            }
        })
    })
}