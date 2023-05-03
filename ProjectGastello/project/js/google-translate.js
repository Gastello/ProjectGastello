const translatorText = document.querySelector('#translator-text');
const translatorResult = document.querySelector('#translator-result');
const translatorSwitch = document.querySelector('#translator-switch');

let sourceLang = 'uk';
let targetLang = 'en';

let isEnglish = false;

translatorSwitch.onclick = () => {
    languagesSwitch();
}

translatorText.oninput = () => {
    translate();
}

function languagesSwitch() {
    [translatorResult.value, translatorText.value] = [translatorText.value, translatorResult.value];
    if (isEnglish) {
        translatorText.placeholder = "Ваш текст...";;
        translatorResult.placeholder = "Your translation...";
    } else {
        translatorText.placeholder = "Your text...";;
        translatorResult.placeholder = "Ваш переклад...";
    }
    [targetLang, sourceLang] = [sourceLang, targetLang];
    isEnglish = !isEnglish;
    translate();
}
function translate() {

    let sourceText = translatorText.value.trim();

    if (sourceText == "") {
        translatorResult.value = "";
        return;
    }

    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let res = [];

            for (const item of data[0]) {
                res.push(item[0]);
            }

            translatorResult.value = res.join(' ');
        });

}