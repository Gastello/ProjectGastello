let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__menu');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');

console.log(header_menu)
header__burger.onclick = function () {
   header__burger.classList.toggle('active');
   header_menu.classList.toggle('active');
   back.classList.toggle('lock');
}

header_menu.onclick = function (event) {
   console.log('click');
   if (event.target === event.currentTarget) {
      console.log('Handle click');
      header__burger.classList.remove('active');
      header_menu.classList.remove('active');
      back.classList.remove('lock');
   }
}