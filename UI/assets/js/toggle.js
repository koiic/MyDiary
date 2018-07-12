function toggle() {
    const navbar = document.querySelectorAll('.nav__items');
    navbar.forEach((nav) => {
        nav.classList.toggle('navbar__toggleShow');
    });
}
document.querySelector('.navbar__nav-toggle').addEventListener('click', toggle);