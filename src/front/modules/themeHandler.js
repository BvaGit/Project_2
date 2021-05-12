// const theme = document.getElementById('theme');

function themeHandler () {
    const general = document.getElementById('general');
    const selectedTheme = document.getElementById('select-theme');
    const darkThemeClass = 'theme-dark';
    const lightThemeClass = 'theme-light';

    function setTheme(rootElement, theme) {
        localStorage.setItem('selected-theme', theme);
        switch (theme) {
            case 'dark':
                rootElement.className = `general ${darkThemeClass}`;
                break;

            case 'light':
                rootElement.className = `general ${lightThemeClass}`;
                break;
        }
    }

    // get from localStorage
    const localStorageTheme = localStorage.getItem('selected-theme');
    setTheme(general, localStorageTheme);
    selectedTheme.value = localStorageTheme;
    
    selectedTheme.addEventListener('change', () => {
        setTheme(general, selectedTheme.value);
        // if (selectedTheme.value === 'dark') {
        //     console.log(selectedTheme.value);
            
        //     general.style.backgroundColor = 'rgb(26, 26, 26)';
        //     header.style.backgroundColor = 'rgb(26, 26, 26)';
        //     logo.style.color = 'rgb(255,255,255)';
        //     selectedTheme.style.color = 'rgb(255,255,255)';
        //     selectedLanguage.style.color = 'rgb(255,255,255)';
        //     firstnameInput.style.color = 'rgb(255,255,255)';
        //     lastnameInput.style.color = 'rgb(255,255,255)';
        //     ageInput.style.color = 'rgb(255,255,255)';
        //     cityInput.style.color = 'rgb(255,255,255)';
        //     phonenumberInput.style.color = 'rgb(255,255,255)';
        //     emailInput.style.color = 'rgb(255,255,255)';
        //     companynameInput.style.color = 'rgb(255,255,255)';
        //     updateData.style.color = 'rgb(255,255,255)';
        //     createData.style.color = 'rgb(255,255,255)';

        // } else {
        //     console.log('light');
        //     general.style.backgroundColor = '#fff';
        //     header.style.backgroundColor = '#ccc';
        //     logo.style.color = '#000';
        //     selectedTheme.style.color = '#000';
        //     selectedLanguage.style.color = '#000';
        //     firstnameInput.style.color = '#000';
        //     lastnameInput.style.color = '#000';
        //     ageInput.style.color = '#000';
        //     cityInput.style.color = '#000';
        //     phonenumberInput.style.color = '#000';
        //     emailInput.style.color = '#000';
        //     companynameInput.style.color = '#000';
        //     updateData.style.color = '#000';
        //     createData.style.color = '#000';
        // }
    })


}

export default themeHandler;