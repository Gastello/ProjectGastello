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

dbWordsCross.onclick = () => {
    closeModalWindow(dbWordsWrapper);
}
document.onkeyup = function (e) {
    if (e.code == "Escape" && dbFoldersWrapper.classList.contains('active-modal') && dbWordsWrapper.classList.contains('active-modal')) { 
        closeModalWindow(dbWordsWrapper);
    }
    else if (e.code == "Escape" && dbFoldersWrapper.classList.contains('active-modal')) { 
        closeModalWindow(dbFoldersWrapper);
    }
} 