function onReady(callback) {
   Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {


      var intervalId = window.setInterval(function () {
         if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
         }
      }, 500);
   });
}

function setVisible(selector, visible) {
   let selectors = document.querySelectorAll(selector);
   for (let el of selectors) {
      el.style.display = visible ? 'block' : 'none';
   }
}

onReady(function () {
   setVisible('.container', true);
   setVisible('#loading', false);
});