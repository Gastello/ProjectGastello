let resultsContainer = document.querySelector('.quiz__results');
function deleteSplitterByHeight() { 
    for (let el of resultsContainer.children) {
        let elHeight = el.offsetHeight;
        if (elHeight > 31) {
            el.querySelector('.result-quiz__splitter').style.display = 'none';
        } 
    }
}

window.addEventListener('DOMContentLoaded', deleteSplitterByHeight); 
resultsContainer.addEventListener('DOMSubtreeModified', deleteSplitterByHeight); 