function settingsPopup () {
    const settings = document.getElementById('settings');
    const settingsPopup = document.getElementById('settingsPopup');
    settings.addEventListener('click', () => {
        settingsPopup.classList.remove('hideSettingsPopup');
    })
}
export default settingsPopup;