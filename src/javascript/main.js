const themeButton = document.getElementById("toggle-btn");
themeButton.addEventListener('click', () => {
    darkmodeStatus = localStorage.getItem('darkmodeStatus');
    darkmodeStatus !== "active" ? enableDarkMode() : disableDarkMode();

})

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmodeStatus', null);
}

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmodeStatus', 'active');
}
  