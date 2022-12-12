let scrollTop = document.querySelector('.scroll_top');

scrollTop.onclick = function () {
   scrollTop.classList.remove('scroll_top_anim');
   scrollTop.offsetHeight; /* trigger reflow */
   scrollTop.classList.add('scroll_top_anim');
   window.scrollTo({
      top: 0, behavior: 'smooth'
   });
}