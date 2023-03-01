const swiper_4 = new Swiper('.swiper_4', {
   effect: 'flip',
   allowTouchMove: true,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   flipEffect: {
      slideShadows: false,
   },
   breakpoints: {
      649.98: {
         allowTouchMove: false,
      },
   }
});

document.body.onkeyup = function (e) {
   if (e.code == "Space" || e.keyCode == 32) {
      let activeSlide = document.querySelector('.swiper-slide-active');
      let activeFlashCard = activeSlide.querySelector('.flash-card');
      activeFlashCard.classList.toggle('active');
   }

   if (e.code == "ArrowLeft" || e.keyCode == 37) {
      swiper_4.slidePrev();
   }

   if (e.code == "ArrowRight" || e.keyCode == 39) {
      swiper_4.slideNext();
   }
}