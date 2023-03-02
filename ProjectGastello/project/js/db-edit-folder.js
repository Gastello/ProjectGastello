let folderEditBtns = document.querySelectorAll('.db-folder__edit');

for (const btn of folderEditBtns) {
    btn.onclick = () => {
        let folder = btn.parentElement.parentElement;
        let folderSaveBtn = folder.querySelector('.db-folder__save');
        let folderEditBtn = folder.querySelector('.db-folder__edit');
        let folderDeleteBtn = folder.querySelector('.db-folder__delete');
        let folderNameContainer = folder.querySelector('.db-folder__title'); 
        let folderName = folderNameContainer.textContent.replaceAll(/\s+/g,' ').trim();
        let folderNameContainerHeight = folderNameContainer.offsetHeight; 
        folderSaveBtn.style.display = 'block';
        folderEditBtn.style.display = 'none';
        folderDeleteBtn.style.display = 'none';
        folderNameContainer.style.display = 'none'; 
        folderNameContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-folder__textarea">${folderName}</textarea>`
        )
        let folderTextarea = folder.querySelector('.db-folder__textarea');
        folderTextarea.style.height = `${folderNameContainerHeight}px`;
        folder.onclick = null; 
    }
}

let folderSaveBtns = document.querySelectorAll('.db-folder__save');

for (const btn of folderSaveBtns) {
    btn.onclick = () => {
        let folder = btn.parentElement.parentElement;
        let folderSaveBtn = folder.querySelector('.db-folder__save');
        let folderEditBtn = folder.querySelector('.db-folder__edit');
        let folderDeleteBtn = folder.querySelector('.db-folder__delete');
        let folderTextarea = folder.querySelector('.db-folder__textarea');
        let folderNameContainer = folder.querySelector('.db-folder__title');
        folderNameContainer.textContent = folderTextarea.value.replaceAll(/\s+/g,' ').trim();  
        folderTextarea.remove();
        folderSaveBtn.style.display = 'none';
        folderEditBtn.style.display = 'block';
        folderDeleteBtn.style.display = 'block';
        folderNameContainer.style.display = 'block';
        folder.onclick = checkIsNotNav;
    }
}
