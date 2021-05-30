import  supportMain  from './supportMain';

export default function inputsControl () {
    const inputs = document.querySelectorAll('.panel__input');
    const phoneError = document.querySelector('.input-error-phone');
    const emailError = document.querySelector('.input-error-email');
    const ageError = document.querySelector('.input-error-age');
    const cityError = document.querySelector('.input-error-city');
    const createBtn = document.getElementById('create');

    for (let input of inputs) {
        window.addEventListener('keyup', function (event) {
            if (supportMain.isEscapeKey(event)) {
                clearInputsCP(event, input, phoneError, emailError, ageError, cityError, createBtn);
            }  
        })
    }
}
export function clearInputsCP (event, input, phone, email, age, city) {
    input.value = '';
    input.classList.remove('has-error');
    event.target.blur();
    phone.classList.add('hide');
    email.classList.add('hide');
    age.classList.add('hide');
    city.classList.add('hide');
}