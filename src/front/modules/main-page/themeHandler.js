export default function themeHandler () {
    const general = document.getElementById('general');
    const selectedTheme = document.getElementById('select-theme');
    const localStorageTheme = localStorage.getItem('selected-theme') || 'light';
    selectedTheme.value = localStorageTheme;
    setTheme(general, localStorageTheme);
    
    selectedTheme.addEventListener('change', () => {
        setTheme(general, selectedTheme.value);
    })
}
export function setTheme(rootElement, theme) {
    const darkThemeClass = 'theme-dark';
    const lightThemeClass = 'theme-light';
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