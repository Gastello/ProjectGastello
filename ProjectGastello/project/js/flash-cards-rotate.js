let flashCards = document.querySelectorAll('#flash-card-rotate'); 
for (const flashCard of flashCards) {
   flashCard.onclick = () => { 
      flashCard.parentElement.parentElement.parentElement.classList.toggle('active');
   }  
}