let homeMap = document.querySelector('.home__map');

homeMap.onclick = function () {
   window.scrollTo({
      top: 0, behavior: 'smooth'
   });
}