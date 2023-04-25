let flashCards = document.querySelectorAll('.flash-card');
for (const flashCard of flashCards) {
   flashCard.onclick = (e) => {
      if (e.target.className == 'flash-card__gear_inner') return;
      flashCard.classList.toggle('active');
   }
}

function flashCardRotate() {
   if (event.target.className == 'flash-card__gear_inner') return;
   event.currentTarget.classList.toggle('active');
}

