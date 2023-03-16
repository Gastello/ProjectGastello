function onReady(callback) {
   Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {


      var intervalId = window.setInterval(function () {
         if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
         }
      }, 700);
   });
}

onReady(function () {
   const containerLoad = document.querySelectorAll('.container');
   const swordLoad = document.querySelector('#loading'); 
   for (let el of containerLoad) {
      el.style.opacity = 1;
   } 
   swordLoad.style.display = 'none';
});