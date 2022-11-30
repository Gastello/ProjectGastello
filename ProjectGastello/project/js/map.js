let header_burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__menu');
let back = document.querySelector('body');
let header_invisible = document.querySelector('.header__invisible');

header_burger.onclick = function () {
   header_burger.classList.toggle('active');
   header_menu.classList.toggle('active');
   back.classList.toggle('lock');
}

header_menu.onclick = closeMap;
header_invisible.onclick = closeMap;

function closeMap(event) {
   if (event.target === event.currentTarget) {
      header_burger.classList.remove('active');
      header_menu.classList.remove('active');
      back.classList.remove('lock');
   }
}