export default function themeHandler () {
    const general = document.getElementById('general');
    const selectedTheme = document.getElementById('select-theme');
    const darkThemeClass = 'theme-dark';
    const lightThemeClass = 'theme-light';

    const localStorageTheme = localStorage.getItem('selected-theme');
    selectedTheme.value = localStorageTheme;
    setTheme(general, localStorageTheme);
    
    selectedTheme.addEventListener('change', () => {
        setTheme(general, selectedTheme.value);
    })

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
}