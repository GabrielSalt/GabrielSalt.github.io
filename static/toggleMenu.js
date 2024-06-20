function toggleMenu() {
    const menu = document.getElementsByClassName('dropdown-menu')[0];
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}