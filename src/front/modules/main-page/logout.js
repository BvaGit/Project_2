export default function logout () {
    const logout = document.getElementById('logout');
    const logoutIcon = document.getElementById('logout-icon');
    
    logout.addEventListener('mouseenter', () => {
        logoutIcon.src = '../img/exit_yellow.png';
    })
    logout.addEventListener('mouseleave', () => {
        logoutIcon.src = '../img/exit_white.png';
    })
}
