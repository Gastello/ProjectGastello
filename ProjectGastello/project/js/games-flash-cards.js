import { shuffle, gearClicked } from "./game-settings-fb.js";

const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsCrosses = document.querySelectorAll('.games-settings__cross');
const cardsContainer = document.querySelector('.swiper_4').children[0];
let chosenWords = [];

for (const gamesSettingsCross of gamesSettingsCrosses) {
    gamesSettingsCross.onclick = crossSettingsClicked;
}

function crossSettingsClicked() {
    closeModalWindow(gamesSettingsWrapper);
    chosenWords = [];
    getActiveFoldersFromSettings();
    chosenWords = shuffle(chosenWords);
    cardsCreate(chosenWords);
}

function getActiveFoldersFromSettings() {
    let userFolders = JSON.parse(localStorage.getItem("folders"));

    for (const folderKey in userFolders) {
        if (userFolders[folderKey].isActive == true) {
            for (const wordObjKey in userFolders[folderKey].words) {
                chosenWords.push(
                    {
                        word: userFolders[folderKey].words[wordObjKey].word,
                        translation: userFolders[folderKey].words[wordObjKey].translation
                    }
                );
            }
        }
    }
}

function cardsCreate(array) {
    cardsContainer.innerHTML = '';
    if (array.length == 0) {
        cardsContainer.insertAdjacentHTML(
            'beforeend',
            ` <div class="swiper-slide">
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
         </div>`);
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