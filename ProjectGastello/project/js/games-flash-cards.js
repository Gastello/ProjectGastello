import { shuffle, gearClicked, getActiveFoldersFromSettings } from "./game-settings-fb.js";

const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsCrosses = document.querySelectorAll('.games-settings__cross');
const cardsContainer = document.querySelector('.swiper_4').children[0];
let chosenWords = [];
const defaultSlide = `<div class="swiper-slide">
<div class="flash-card">
   <div class="flash-card__word games__scroll">
      <div class="flash-card__header">
         <button class="flash-card__dragon tooltip">
            <img src="./icons/green-dragon.svg" alt="green-dragon">
            <span class="tooltiptext">Use spacebar to flip the flashcard.
               Swipe with arrows. </span>
         </button>
         <button class="flash-card__gear db-gear">
            <img class="flash-card__gear_inner" src="./icons/gear.svg" alt="gear">
         </button>
      </div>
      <div class="flash-card__text">
         Choose Folders!
      </div>
   </div>
   <div class="flash-card__translation games__scroll">
      <div class="flash-card__header">
         <button class="flash-card__dragon tooltip" id="flash-card-rotate">
            <img src="./icons/green-dragon.svg" alt="green-dragon">
            <span class="tooltiptext">Use spacebar to flip the flashcard.
               Swipe with arrows. </span>
         </button>
         <button class="flash-card__gear db-gear">
            <img class="flash-card__gear_inner" src="./icons/gear.svg" alt="gear">
         </button>
      </div>
      <div class="flash-card__text">
         Обери Папки!
      </div>
   </div>
</div>
</div>`;
for (const gamesSettingsCross of gamesSettingsCrosses) {
   gamesSettingsCross.onclick = crossSettingsClicked;
}

function crossSettingsClicked() {
   closeModalWindow(gamesSettingsWrapper);
   chosenWords = getActiveFoldersFromSettings();
   chosenWords = shuffle(chosenWords);
   cardsCreate(chosenWords);
}

function cardsCreate(array) {
   cardsContainer.innerHTML = '';
   if (array.length == 0) {
      cardsContainer.insertAdjacentHTML(
         'beforeend',
         defaultSlide);
   }
   else {
      for (const card of array) {
         cardsContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="swiper-slide">
                <div class="flash-card">
                   <div class="flash-card__word games__scroll">
                      <div class="flash-card__header">
                         <button class="flash-card__dragon tooltip">
                            <img src="./icons/green-dragon.svg" alt="green-dragon">
                            <span class="tooltiptext">Use spacebar to flip the flashcard.
                               Swipe with arrows. </span>
                         </button>
                         <button class="flash-card__gear db-gear">
                            <img class="flash-card__gear_inner" src="./icons/gear.svg" alt="gear">
                         </button>
                      </div>
                      <div class="flash-card__text">
                         ${card.word}
                      </div>
                   </div>
                   <div class="flash-card__translation games__scroll">
                      <div class="flash-card__header">
                         <button class="flash-card__dragon tooltip" id="flash-card-rotate">
                            <img src="./icons/green-dragon.svg" alt="green-dragon">
                            <span class="tooltiptext">Use spacebar to flip the flashcard.
                               Swipe with arrows. </span>
                         </button>
                         <button class="flash-card__gear db-gear" onclick="gearClicked()">
                            <img class="flash-card__gear_inner" src="./icons/gear.svg" alt="gear">
                         </button>
                      </div>
                      <div class="flash-card__text">
                      ${card.translation}
                      </div>
                   </div>
                </div>
             </div>`
         );
      }
   }

   let slidesFromContainer = cardsContainer.children;
   for (const slide of slidesFromContainer) {
      let card = slide.querySelector('.flash-card');
      let gears = slide.querySelectorAll('.db-gear');
      card.onclick = flashCardRotate;
      gears[0].onclick = gearClicked;
      gears[1].onclick = gearClicked;
   }
   swiper_4.update();
}

let crossImg = document.querySelectorAll('.db__cross');
for (const el of crossImg) {
   el.children[0].onclick = () => {
      chosenWords = [];
      cardsContainer.innerHTML = '';
      cardsContainer.insertAdjacentHTML(
         'beforeend',
         defaultSlide);
      let slidesFromContainer = cardsContainer.children;
      for (const slide of slidesFromContainer) {
         let card = slide.querySelector('.flash-card');
         let gears = slide.querySelectorAll('.db-gear');
         card.onclick = flashCardRotate;
         gears[0].onclick = gearClicked;
         gears[1].onclick = gearClicked;
      }
      swiper_4.update();
   }
}