let userProfile = document.querySelector('.header__user');
let userIco = userProfile.children[0];
userIco.onclick = function () {
   userProfile.classList.toggle('active');
}