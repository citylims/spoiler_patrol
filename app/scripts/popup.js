var app = chrome.extension.getBackgroundPage();
// console.log(app.backgroundFunction());


document.body.onload = function() {
  console.log("onload");
  chrome.storage.sync.get('value', function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      if ($.isEmptyObject(items)) {
        console.log("empty");
      }
      else {
        $('#spoilers').text(items);
      }
    }
  })
}

$('#add-btn').click(function(e) {
  e.preventDefault();
  var str = console.log($('input').val());
  if (str === "") {
    console.log("break");
    return;
  }
  else {
    chrome.storage.sync.set({'value': str}, function() {
           // Notify that we saved.
           console.log('Settings saved');
           window.close();
     });
   }
});


$('#get-btn').click(function(e) {
  e.preventDefault();

})
