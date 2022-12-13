let userProfile = document.querySelector('.header__user');
let userIco = userProfile.children[0];
console.log(userProfile);
console.log(userIco);
userIco.onclick = function () {
   userProfile.classList.toggle('active');
   console.log(1)
}