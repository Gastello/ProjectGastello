import { shuffle } from "./game-settings-fb.js";

let userFolders = JSON.parse(localStorage.getItem("folders"));
const gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
const gamesSettingsCross = document.querySelector('.games-settings__cross');

let chosenWords = [];

gamesSettingsCross.onclick = () => {
    closeModalWindow(gamesSettingsWrapper);
    chosenWords = [];
    getActiveFoldersFromSettings();
    chosenWords = shuffle(chosenWords);
    console.log(chosenWords)
}

function getActiveFoldersFromSettings() {
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