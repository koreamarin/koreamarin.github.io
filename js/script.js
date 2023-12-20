(function () {
    // const menu = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right');

    // menu.addEventListener('click', toggleMenu);

    function toggleMenu() {
        menu
            .classList
            .toggle('is-active');
        navRight
            .classList
            .toggle('is-active');
    }

    var year = new Date().getFullYear();	// 연도
    document.getElementById("year").innerText=year
})();