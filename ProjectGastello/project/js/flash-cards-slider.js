const swiper_4 = new Swiper('.swiper_4', {
   effect: 'flip', 
   allowTouchMove: true,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   breakpoints: { 
      767.98: {
         allowTouchMove: false,
      }, 
  }
});