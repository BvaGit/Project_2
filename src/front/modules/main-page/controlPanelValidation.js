import { ServerValidator } from "../../../backend/service/ServerValidator";

function validateName(input) {
    const inputValue = input.value;
    if (ServerValidator.NAME_PATTERN.test(inputValue)) {
        input.classList.remove('has-error');
    } else {
        input.classList.add('has-error');
        input.value = '';
    }
}
function validateCity(input) {
    const inputValue = input.value;
    if (ServerValidator.CITY_PATTERN.test(inputValue)) {
        input.classList.remove('has-error');
    } else {
        input.classList.add('has-error');
        input.value = '';
    }
}
function validateEmail(input) {
    const inputValue = input.value;
    if (ServerValidator.EMAIL_PATTERN.test(inputValue)) {
        input.classList.remove('has-error');
    } else {
        input.classList.add('has-error');
        input.value = '';
        input.placeholder = 'your-email@domain.com'
    }
}
function validatePhone(input) {
    const inputValue = input.value;
    if (ServerValidator.EMAIL_PATTERN.test(inputValue)) {
        input.classList.remove('has-error');
    } else {
        input.classList.add('has-error');
        input.value = '';
        input.placeholder = '(xxx)-xxx-xxxx';
    }
}
function validateAge(input) {
    const inputValue = input.value;
    if (inputValue > 0 && inputValue <= 123 && inputValue !== '') {
        input.classList.remove('has-error');
    } else {
        input.classList.add('has-error');
        input.value = '';
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
                    validateName(input);
                    break;
                case 'lastName':
                    validateName(input);
                    break;
                case 'city':
                    validateCity(input);
                    break;
                case 'email':
                    validateEmail(input);
                    break;
                case 'phone':
                    validatePhone(input);
                    break;
                case 'age':
                    validateAge(input);
                    break;
            }
        })
    })
}