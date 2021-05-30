class FrontValidator {
    static NAME_PATTERN = /^([A-ZА-ЯІЇЄ]{1,20})$/i
    static EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    static PHONE_PATTERN = /^\(?\(([0-9]{3}\))\)?[-. ]?\-([0-9]{3})[-. ]?\-([0-9]{4})$/
    static REG_AUTH_PATTERN =/^([A-Z0-9!#$%&'*+/=?^_`{|}~-]{5,20})$/i
    static CITY_PATTERN = /^([A-ZА-ЯІЇЄ]{1}[a-zа-яієї\s0-9-]{0,19})$/
  
    static validateStr(str,regexp) {
      return typeof str === 'string' && regexp.test(str)
    }
    static validateNumber(num,func) {
      return typeof num === 'number' && func(num)
    }
}
export const validationOnInputs = {
    validateName(input) {
        const inputValue = input.value;
        if (FrontValidator.NAME_PATTERN.test(inputValue)) {
            input.classList.remove('has-error');
        } else {
            input.classList.add('has-error');
            input.value = '';
        }
    },
    validateCity(input) {
        const inputValue = input.value;
        const cityError = document.querySelector('.input-error-city');
        if (FrontValidator.CITY_PATTERN.test(inputValue)) {
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
        if (FrontValidator.EMAIL_PATTERN.test(inputValue)) {
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

        if (FrontValidator.PHONE_PATTERN.test(inputValue)) {
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
    },
    validateCompany(input) {
        const inputValue = input.value;
        const companyError = document.querySelector('.input-error-company');
        if (inputValue !== '') {
            input.classList.remove('has-error');
            companyError.classList.add('hide');
        } else {
            input.classList.add('has-error');
            input.value = '';
            companyError.classList.remove('hide');
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
                case 'company':
                    validationOnInputs.validateCompany(input);
                    break;
            }
        })
    })
}
