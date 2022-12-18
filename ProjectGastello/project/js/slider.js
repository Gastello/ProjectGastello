const swiper_2 = new Swiper('.swiper_2', {
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
      swiper_2.slideNext();
   }
}

for (let swiperPrev of swiperPrevArr) {
   swiperPrev.onclick = function () {
      swiper_2.slidePrev();
   }
}
