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
                input.value = '';
                input.classList.remove('has-error');
                event.target.blur();
                phoneError.classList.add('hide');
                emailError.classList.add('hide');
                ageError.classList.add('hide');
                cityError.classList.add('hide');
            }
        })
    }
}
