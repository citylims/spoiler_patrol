var app = chrome.extension.getBackgroundPage();

document.body.onload = function() {
  console.log("onload");
  chrome.storage.sync.get('value', function(item) {
    if (!chrome.runtime.error) {
      console.log(item);
      if ($.isEmptyObject(item)) {
        console.log("empty");
      }
      else {
        updatePopup(item.value)
      }
    }
  })
}


$('#add-btn').click(function(e) {
  e.preventDefault();
  var str = $('input').val();
  if (str !== "") {
    chrome.storage.sync.set({'value': str}, function() {
      updatePopup(str);
      // window.close();
    });
    chrome.runtime.sendMessage({add: "add"}, function(response) {
      console.log(response.farewell);
      updatePopup(str)
    });
    chrome.runtime.sendMessage({greeting: "greeting"}, function(response) {
      console.log(response.farewell);
    });
  }
});


function updatePopup(str) {
  $('#spoilers').text(str);
}
