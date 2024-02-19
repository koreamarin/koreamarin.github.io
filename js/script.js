(function () {
  // const menu = document.querySelector('.nav-toggle');
  // const navRight = document.querySelector('.nav-right');
  // menu.addEventListener('click', toggleMenu);
  // function toggleMenu() {
  //     menu
  //         .classList
  //         .toggle('is-active');
  //     navRight
  //         .classList
  //         .toggle('is-active');
  // }

  var year = new Date().getFullYear(); // 연도
  document.getElementById("year").innerText = year;

  urlpathList = window.location.pathname.split("/");

  var urlpath = urlpathList[1];
  var selectedCategory = urlpathList[2];

  urlpath
    ? document.getElementById(urlpath).classList.add("selected")
    : document.getElementById("home").classList.add("selected");

  selectedCategory
    ? document.getElementById(selectedCategory).classList.add("tag-fill-mint")
    : document.getElementById("ALL").classList.add("tag-fill-mint");
})();
