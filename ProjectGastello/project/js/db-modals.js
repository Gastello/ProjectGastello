function closeModalWindow(element) {
    let activeModals = document.querySelectorAll('.active-modal');
    element.classList.remove('active-modal');
    if (activeModals.length <= 1) {
        back.classList.remove('lock');
    }
}
function openModalWindow(element) {
    element.classList.add('active-modal');
    back.classList.add('lock');
}

let dbFoldersCross = document.querySelector('.db-folders__cross');
let dbFoldersWrapper = document.querySelector('.db-folders__wrapper');
let userWords = document.querySelector('.user_header__words');

userWords.onclick = () => {
    openModalWindow(dbFoldersWrapper);
}
dbFoldersCross.onclick = () => {
    closeModalWindow(dbFoldersWrapper);
}

let dbFoldersArray = document.querySelectorAll('.db-folder');
let dbWordsCross = document.querySelector('.db-words__cross');
let dbWordsWrapper = document.querySelector('.db-words__wrapper');

for (const el of dbFoldersArray) {
    el.onclick = () => {
        openModalWindow(dbWordsWrapper);
    }
}
dbWordsCross.onclick = () => {
    closeModalWindow(dbWordsWrapper);
} 