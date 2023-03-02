let folderEditBtns = document.querySelectorAll('.db-folder__edit');

for (const btn of folderEditBtns) {
    btn.onclick = (e) => {
        let folder = btn.parentElement.parentElement;
        let folderSaveBtn = folder.querySelector('.db-folder__save');
        let folderEditBtn = folder.querySelector('.db-folder__edit');
        let folderDeleteBtn = folder.querySelector('.db-folder__delete');
        folderSaveBtn.style.display = 'block';
        folderEditBtn.style.display = 'none';
        folderDeleteBtn.style.display = 'none';
        folder.onclick = null;
        // folder.onclick = checkIsNotNav;
    }
}

let folderSaveBtns = document.querySelectorAll('.db-folder__save');

for (const btn of folderSaveBtns) {
    btn.onclick = (e) => {
        let folder = btn.parentElement.parentElement;
        let folderSaveBtn = folder.querySelector('.db-folder__save');
        let folderEditBtn = folder.querySelector('.db-folder__edit');
        let folderDeleteBtn = folder.querySelector('.db-folder__delete');
        folderSaveBtn.style.display = 'none';
        folderEditBtn.style.display = 'block';
        folderDeleteBtn.style.display = 'block';
        folder.onclick = checkIsNotNav;
    }
}
