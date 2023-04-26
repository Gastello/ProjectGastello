import { shuffle, getActiveFoldersFromSettings } from "./game-settings-fb.js";

const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsCross = document.querySelector('.games-settings__cross');

const question = document.querySelector('.answer-quiz__word ');
const answer = document.querySelector('.answer-quiz__translation');

const resContainer = document.querySelector('.quiz__results');

const trueButton = document.querySelector('.quiz__true');
const falseButton = document.querySelector('.quiz__false');

let chosenWords = [];
let questionWords = [];

let iteratorOfWords = 0;
let chosenWordsLength = chosenWords.length - 1;
gamesSettingsCross.onclick = crossSettingsClicked;

function shuffleArrayWithPercentage(arr, percentage) {
   const length = arr.length;
   const itemsToShuffle = Math.floor(length * percentage / 100);
   for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr.slice(0, itemsToShuffle);
}

function crossSettingsClicked() {
   iteratorOfWords = 0;
   resContainer.innerHTML = '';
   question.innerText = 'Choose Folders!';
   answer.innerText = 'Обери Папки!';
   closeModalWindow(gamesSettingsWrapper);
   chosenWords = getActiveFoldersFromSettings();
   if (chosenWords.length) {
      chosenWords = shuffle(chosenWords);
      questionWords = shuffle(chosenWords, 45);

      chosenWordsLength = chosenWords.length - 1;
      wordRender(iteratorOfWords);
   }
}

trueButton.onclick = () => { resButtonClicked(true) };
falseButton.onclick = () => { resButtonClicked(false) };

function resButtonClicked(userAnswer) {
   if (chosenWordsLength >= 0) {
      checkResults(iteratorOfWords, userAnswer);
      wordRender(iteratorOfWords);
      resContainer.scrollTop = resContainer.scrollHeight;
   }
};

function wordRender(index) {
   question.innerText = chosenWords[index].word;
   answer.innerText = questionWords[index].translation;
}
function checkResults(index, userAnswer) {
   let currentWord = chosenWords[index].word;
   let currentTranslation = questionWords[index].translation;
   let correctTranslation = chosenWords[index].translation;
   if ((currentTranslation == correctTranslation) == userAnswer) {
      resContainer.insertAdjacentHTML(
         'beforeend',
         `<div class="quiz__result result-quiz result-quiz_correct">
         <div class="result-quiz__image"></div>
         <div class="result-quiz__results">
            <div class="result-quiz__question text_convert">
               ${currentWord}
            </div>
            <div class="result-quiz__answer text_convert">
               ${currentTranslation}
            </div>
         </div>
         <span class="result-quiz__res text_convert">Is ${userAnswer}!</span>
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
               ${currentTranslation}
            </div>
         </div>
         <span class="result-quiz__res text_convert">Isn't  ${userAnswer}!</span>
      </div>`);
   }
   iteratorOfWords++;
   if (iteratorOfWords > chosenWordsLength) {
      chosenWords = shuffle(chosenWords);
      questionWords = shuffle(chosenWords, 45);
      iteratorOfWords = 0;
   }
}

let quiz__wrapper = document.querySelector('.quiz__wrapper')
quiz__wrapper.focus();
document.onkeyup = function (e) {
   if (e.code == "ArrowLeft") {
      resButtonClicked(true);
   }
   else if (e.code == "ArrowRight") {
      resButtonClicked(false);
   }
}

let crossImg = document.querySelectorAll('.db__cross');
for (const el of crossImg) {
   el.children[0].onclick = () => {
      iteratorOfWords = 0;
      resContainer.innerHTML = '';
      question.innerText = 'Choose Folders!';
      answer.innerText = 'Обери Папки!';
      chosenWords = [];
   }
}