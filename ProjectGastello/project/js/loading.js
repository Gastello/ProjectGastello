function onReady(callback) {
   var intervalId = window.setInterval(function () {
      if (document.getElementsByTagName('body')[0] !== undefined) {
         window.clearInterval(intervalId);
         callback.call(this);
      }
   }, 500);
}

function setVisible(selector, visible) {
   document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function () {
   setVisible('.container', true);
   setVisible('#loading', false);
});