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
        const cityError = document.querySelector('.input-error-city');
        if (ServerValidator.CITY_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
            cityError.classList.add('hide');
        } else {
            input.classList.add('has-error');
            input.value = '';
            cityError.classList.remove('hide');
        }
    },
    validateEmail(input) {
        const inputValue = input.value;
        const emailError = document.querySelector('.input-error-email');
        if (ServerValidator.EMAIL_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
            emailError.classList.add('hide');
        } else {
            input.classList.add('has-error');
            input.value = '';
            emailError.classList.remove('hide');
        }
    },
    validatePhone(input) {
        const inputValue = input.value;
        const phoneError = document.querySelector('.input-error-phone');

        if (ServerValidator.PHONE_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
            phoneError.classList.add('hide');
        } else {
            input.classList.add('has-error');
            input.value = '';
            phoneError.classList.remove('hide');
        }
    }, 
    validateAge(input) {
        const inputValue = input.value;
        const ageError = document.querySelector('.input-error-age');
        if (inputValue > 0 && inputValue <= 123 && inputValue !== '') {
            input.classList.remove('has-error');
            ageError.classList.add('hide');
        } else {
            input.classList.add('has-error');
            input.value = '';
            ageError.classList.remove('hide');
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