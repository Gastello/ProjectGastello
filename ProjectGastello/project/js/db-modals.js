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

let dbFoldersArray = document.querySelector('.db-folders__container').children;
let dbWordsCross = document.querySelector('.db-words__cross');
let dbWordsWrapper = document.querySelector('.db-words__wrapper');
let checkIsNotNav = (e) => {
    let targetClassList = e.target.classList;
    if (targetClassList.contains('db__edit') ||
        targetClassList.contains('db__save') ||
        targetClassList.contains('db__delete')) {
        return;
    }
    openModalWindow(dbWordsWrapper);
};
for (const el of dbFoldersArray) {
    el.onclick = checkIsNotNav;
}
dbWordsCross.onclick = () => {
    closeModalWindow(dbWordsWrapper);
} 