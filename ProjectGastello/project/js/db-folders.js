let dbFoldersCross = document.querySelector('.db-folders__cross');
let dbFoldersWrapper = document.querySelector('.db-folders__wrapper');
let userWords = document.querySelector('.user_header__words');

userWords.onclick = () => { 
    dbFoldersWrapper.classList.add('active');
    back.classList.toggle('lock');
}
dbFoldersCross.onclick = () => {
    dbFoldersWrapper.classList.remove('active');
}