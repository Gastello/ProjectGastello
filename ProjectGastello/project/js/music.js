var music = document.querySelector('.music');
var play_music_button = document.querySelector('.user_header__music');

function playAudio() {
   if (music.paused) {
      music.play();
      play_music_button.innerText = 'Music On';
   } else {
      music.pause();
      play_music_button.innerText = 'Music Off';
   }
   music.addEventListener('ended', function () {
      play_music_button.innerText = 'Music On';
   });
}
play_music_button.addEventListener("click", playAudio);