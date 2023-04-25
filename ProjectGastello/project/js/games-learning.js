import { shuffle, getActiveFoldersFromSettings } from "./game-settings-fb.js";

const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsCross = document.querySelector('.games-settings__cross');
const question = document.querySelector('.quiz__question');
const resContainer = document.querySelector('.quiz__results');
const resButton = document.querySelector('.quiz__button');
const resInput = document.querySelector('.quiz__input');

let chosenWords = [];
let iteratorOfWords = 0;
let chosenWordsLength = chosenWords.length - 1;
gamesSettingsCross.onclick = crossSettingsClicked;

function crossSettingsClicked() {
   iteratorOfWords = 0;
   resContainer.innerHTML = '';
   question.innerText = 'Choose Folders!';
   closeModalWindow(gamesSettingsWrapper);
   chosenWords = getActiveFoldersFromSettings();
   if (chosenWords.length) {
      chosenWords = shuffle(chosenWords);
      chosenWordsLength = chosenWords.length - 1;
      wordRender(iteratorOfWords);
   }
}

resButton.onclick = resButtonClicked;

function resButtonClicked() {
   let userAnswer = resInput.value.replaceAll(/\s+/g, ' ').trim();
   if (chosenWordsLength >= 0 && userAnswer != "") {
      checkResults(iteratorOfWords, userAnswer);
      wordRender(iteratorOfWords);
      resContainer.scrollTop = resContainer.scrollHeight;
   }
   resInput.value = "";
};

function wordRender(index) {
   question.innerText = chosenWords[index].word;
}
function checkResults(index, userAnswer) {
   let currentWord = chosenWords[index].word;
   let correctAnswer = chosenWords[index].translation;
   if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
      resContainer.insertAdjacentHTML(
         'beforeend',
         `<div class="quiz__result result-quiz result-quiz_correct">
         <div class="result-quiz__image"></div>
         <div class="result-quiz__results">
            <div class="result-quiz__question text_convert">
               ${currentWord}
            </div>
            <div class="result-quiz__answer text_convert">
               ${userAnswer}
            </div>
         </div>
         <span class="result-quiz__res text_convert">Correct!</span>
      </div>`);
   } else {
      resContainer.insertAdjacentHTML(
         'beforeend',
         `<div class="quiz__result result-quiz result-quiz_wrong">
         <div class="result-quiz__image"></div>
         <div class="result-quiz__results">
            <div class="result-quiz__question text_convert">
               ${currentWord}
            </div>
            <div class="result-quiz__answer text_convert">
               ${userAnswer}
            </div>
         </div>
         <span class="result-quiz__res text_convert">Wrong!</span>
      </div>`);
   }
   iteratorOfWords++;
   if (iteratorOfWords > chosenWordsLength) {
      chosenWords = shuffle(chosenWords);
      iteratorOfWords = 0;
   }
}

let quiz__wrapper = document.querySelector('.quiz__wrapper')
quiz__wrapper.onkeyup = function (e) {
   if (e.code == "Enter" || e.keyCode == 13) {
      resButtonClicked();
   }
}

let crossImg = document.querySelectorAll('.db__cross');
for (const el of crossImg) {
   el.children[0].onclick = () => {
      iteratorOfWords = 0;
      resContainer.innerHTML = '';
      question.innerText = 'Choose Folders!';
      chosenWords = [];
   }
}