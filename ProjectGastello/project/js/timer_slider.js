const swiper_4 = new Swiper('.swiper_4', {
   nextButton: '.swiper__next',
   loop: false,
   effect: 'slide',
   speed: 0,
   allowTouchMove: false,
   autoHeight: true,
}
);

let swiperNextArr = document.querySelectorAll('.swiper__next');
let swiperPrevArr = document.querySelectorAll('.swiper__prev');

for (let swiperNext of swiperNextArr) {
   swiperNext.onclick = function () {
      swiper_4.slideNext();
   }
}

for (let swiperPrev of swiperPrevArr) {
   swiperPrev.onclick = function () {
      swiper_4.slidePrev();
   }
}
