let inputLogin = document.getElementById('input_login');
let inputPassword = document.getElementById('input-password');
let loginInner = document.querySelector('.login__inner');
inputLogin.onfocus = loginScreenAnimation;
inputPassword.onfocus = loginScreenAnimation;

inputLogin.onblur = loginScreenAnimationEnd;
inputPassword.onblur = loginScreenAnimationEnd;

function loginScreenAnimation() {
   loginInner.classList.add('login__inner_animation');
}

function loginScreenAnimationEnd() {
   loginInner.classList.remove('login__inner_animation');
}
