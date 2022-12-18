const swiper_3 = new Swiper('.swiper_3', {
   pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
   },
});

let swiperNext = document.querySelector('.swiper_3__next');
let swiperPrev = document.querySelector('.swiper_3__prev');

swiperNext.onclick = function () {
   swiper_3.slideNext();
}

swiperPrev.onclick = function () {
   swiper_3.slidePrev();
} 