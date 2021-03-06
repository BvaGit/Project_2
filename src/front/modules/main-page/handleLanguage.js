export default function handleLanguage () {
    let selectedLanguage = document.getElementById('select-language');
    const translateElements = document.querySelectorAll('[data-translate]');
    const placeholderElements = document.querySelectorAll('[data-placeholder]');
    
    const uaTranslations = {
        firstName: `Ім\'я`,
        lastName: 'Прізвище',
        age: 'Вік',
        city: 'Місто',
        phone: 'Телефон',
        email: 'Електронна пошта',
        company: 'Компанія',
        create: 'Створити',
        update: 'Змінити',
        sort: 'Сортувати',
        sortLabel: 'Сортувати',
        clearAll: 'Очистити всі',
        en: 'Анг',
        ua: 'Укр',
        light: 'Світла',
        dark: 'Темна',
        settings: 'Налаштування',
        help: 'Ви маєте можливість змінити логін та пароль',
        confirm: 'Підтвердити',
        cancel: 'Скасувати',
        delete: 'Видалити',
        clarification: 'Видалити всі елементи з таблиці?',
        newLogin: 'Новий логін',
        yourPassword: 'Попередній пароль',
        newPassword: 'Новий пароль',
        repeatPassword: 'Повторіть пароль',
        db: 'База даних',
        success: 'Дані успішно змінені',
        error: 'Сталася помилка, спробуйте ще раз',
        cityError: 'З великої літери та тільки літери, зайченятко',
        emailError: `Пам\'ятай про равлика, сонечко`,
        companyError: `Напиши хоча б компанію своєї мрії`,
        ageError: `Не вигадуй, дуже прошу.`,
        deleteCP: 'Дані успішно видалені, цьомки бомки',
        createCP: 'Зірка народилась, кошенятко',
        updateCP: 'Дані успішно змінені, насолоджуйся',
        noCP: 'Введіть дані, я чекаю.'
    };
    const enTranslations = {
        firstName: 'First name',
        lastName: 'Last name',
        age: 'Age',
        city: 'City',
        phone: 'Phone number',
        email: 'Email',
        company: 'Company name',
        create: 'Create',
        update: 'Update',
        sort: 'Sort',
        sortLabel: 'Sort',
        clearAll: 'Clear All',
        en: 'En',
        ua: 'Ua',
        light: 'Light',
        dark: 'Dark',
        settings: 'Settings',
        help: 'you can change your password and login',
        confirm: 'CONFIRM',
        cancel: 'CANCEL',
        delete: 'DELETE',
        clarification: 'Delete all elements from the table?',
        newLogin: 'New login',
        yourPassword: 'Your password',
        newPassword: 'New password',
        repeatPassword: 'Confirm password',
        db: 'Data base',
        success: 'Changed successfully',
        error: 'Mistakes happens, try again',
        cityError: 'Only capital letters',
        emailError: 'your-email@domain.com',
        companyError: 'Enter your company name',
        ageError: 'Max age 123',
        deleteCP: 'Successfully deleted',
        createCP: 'Successfully created',
        updateCP: 'Successfully updated',
        noCP: 'Enter your data'
    };
    const localStorageLanguage = localStorage.getItem('selected-language') || 'en';
    selectedLanguage.value = localStorageLanguage;
    setLanguage(localStorageLanguage);

    selectedLanguage.addEventListener('change', (event) => {
        setLanguage(selectedLanguage.value);
    })
    function setLanguage (lang) {
        let translation = getTranslation(lang);
        localStorage.setItem('selected-language', lang);

        translateElements.forEach((el) => {
            const translateKey = el.dataset.translate;
            el.textContent = translation[translateKey];
        });
        placeholderElements.forEach((el) => {
            const placeholderKey = el.dataset.placeholder;
            el.placeholder =  translation[placeholderKey];
        })
    }
    function getTranslation(lang) {
        switch (lang) {
            case 'ua':
                return uaTranslations;
            case 'en':
                return enTranslations;
            default: 
                return enTranslations;
        }
    }
}
