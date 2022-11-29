let textsForConvert = document.querySelectorAll(`.text_convert`);

for (let el of textsForConvert) {
   let strConvertBuffer = el.innerText;
   el.innerHTML = "";
   el.insertAdjacentHTML(
      `beforeend`,
      `
      <span class="text_stroke">${strConvertBuffer}</span>
      <span class="text_stroke_bg">${strConvertBuffer}</span>
      `
   )
}