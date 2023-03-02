let folderEditBtns = document.querySelectorAll('.db-folder__edit');

for (const btn of folderEditBtns) {
    btn.onclick = () => {
        let folder = btn.parentElement.parentElement;
        let folderSaveBtn = folder.querySelector('.db-folder__save');
        let folderEditBtn = folder.querySelector('.db-folder__edit');
        let folderDeleteBtn = folder.querySelector('.db-folder__delete');
        let folderTextContainer = folder.querySelector('.db-folder__title'); 
        let folderText = folderTextContainer.textContent.replaceAll(/\s+/g,' ').trim();
        let folderTextContainerHeight = folderTextContainer.offsetHeight; 
        folderSaveBtn.style.display = 'block';
        folderEditBtn.style.display = 'none';
        folderDeleteBtn.style.display = 'none';
        folderTextContainer.style.display = 'none'; 
        folderTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-folder__textarea">${folderText}</textarea>`
        )
        let folderTextarea = folder.querySelector('.db-folder__textarea');
        folderTextarea.style.height = `${folderTextContainerHeight}px`;
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
        let folderTextareaValue = folderTextarea.value.replaceAll(/\s+/g,' ').trim();  
        let folderTextContainer = folder.querySelector('.db-folder__title');
        if(folderTextareaValue!=''){
            folderTextContainer.textContent = folderTextareaValue;
        }
        folderTextarea.remove();
        folderSaveBtn.style.display = 'none';
        folderEditBtn.style.display = 'block';
        folderDeleteBtn.style.display = 'block';
        folderTextContainer.style.display = 'block';
        folder.onclick = checkIsNotNav;
    }
}
