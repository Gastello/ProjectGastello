let wordEditBtns = document.querySelectorAll('.db-word__edit');

for (const btn of wordEditBtns) {
    btn.onclick = () => {
        let word = btn.parentElement.parentElement;

        let wordSaveBtn = word.querySelector('.db-word__save');
        let wordEditBtn = word.querySelector('.db-word__edit');
        let wordDeleteBtn = word.querySelector('.db-word__delete');

        let wordTextContainer = word.querySelector('.db-word__word'); 
        let translationTextContainer = word.querySelector('.db-word__translation'); 
        
        let wordText = wordTextContainer.textContent.replaceAll(/\s+/g,' ').trim();
        let wordTextContainerHeight = wordTextContainer.offsetHeight; 
        let wordTextContainerWidth = wordTextContainer.offsetWidth; 

        let translationText = translationTextContainer.textContent.replaceAll(/\s+/g,' ').trim();
        let translationTextContainerHeight = translationTextContainer.offsetHeight; 
        let translationTextContainerWidth = translationTextContainer.offsetWidth; 

        wordSaveBtn.style.display = 'block';
        wordEditBtn.style.display = 'none';
        wordDeleteBtn.style.display = 'none';

        wordTextContainer.style.display = 'none'; 
        translationTextContainer.style.display = 'none'; 

        wordTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-word__word-textarea">${wordText}</textarea>`
        )
        let wordTextarea = word.querySelector('.db-word__word-textarea');
        wordTextarea.style.height = `${wordTextContainerHeight}px`;
        wordTextarea.style.flexBasis = `${wordTextContainerWidth}px`;

        translationTextContainer.insertAdjacentHTML(
            'beforebegin',
            `<textarea class="db-word__translation-textarea">${translationText}</textarea>`
        )
        let translatTextarea = word.querySelector('.db-word__translation-textarea');
        translatTextarea.style.height = `${translationTextContainerHeight}px`;
        translatTextarea.style.flexBasis = `${translationTextContainerWidth}px`;

        word.onclick = null; 
    }
}

let wordSaveBtns = document.querySelectorAll('.db-word__save');

for (const btn of wordSaveBtns) {
    btn.onclick = () => {
        let word = btn.parentElement.parentElement;

        let wordSaveBtn = word.querySelector('.db-word__save');
        let wordEditBtn = word.querySelector('.db-word__edit');
        let wordDeleteBtn = word.querySelector('.db-word__delete');

        let translationTextarea = word.querySelector('.db-word__translation-textarea');
        let wordTextarea = word.querySelector('.db-word__word-textarea');

        let wordTextareaValue = wordTextarea.value.replaceAll(/\s+/g,' ').trim();  
        let translationTextareaValue = translationTextarea.value.replaceAll(/\s+/g,' ').trim();  

        let wordTextContainer = word.querySelector('.db-word__word'); 
        let translationTextContainer = word.querySelector('.db-word__translation'); 

        if(wordTextareaValue!='' && translationTextareaValue!=''){
            wordTextContainer.textContent = wordTextareaValue;
            translationTextContainer.textContent = translationTextareaValue;
        }

        wordTextarea.remove();
        translationTextarea.remove();

        wordSaveBtn.style.display = 'none';
        wordEditBtn.style.display = 'block';
        wordDeleteBtn.style.display = 'block';

        wordTextContainer.style.display = 'block';
        translationTextContainer.style.display = 'block';

        word.onclick = checkIsNotNav;
    }
}
