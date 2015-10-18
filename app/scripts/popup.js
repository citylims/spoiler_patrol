var app = chrome.extension.getBackgroundPage();

document.body.onload = function() {
  init();
}

function init() {
  getArray();
}

function getArray() {
  //get spoilers array from storage
  chrome.storage.sync.get(["spoilers"], function(result) {
    console.log(result);
    var arr = result.spoilers;
    updatePopup(arr);
  });
}

function defineArr(str) {
  chrome.storage.sync.get(["spoilers"], function(result) {
    var arr = result["spoilers"] ? result["spoilers"] : [];
    console.log(arr);
    arr.unshift(str);
    var jsonObj = {};
    //update popup. need to abstract this.
    updatePopup(arr);
    jsonObj["spoilers"] = arr;
    chrome.storage.sync.set(jsonObj, function() {
        console.log(jsonObj);
        console.log("Saved a new array item");
    });
  });
}

function updatePopup(arr) {
  console.log(arr);
  if (arr.length) {
    arr.reverse();
    $("#spoilers").empty();
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      $("#spoilers").append('<li>'+ arr[i] + '</li>');
    }
  } else {
    $("#empty-msg").text("No saves spoilers");
  }
}

$('#add-btn').click(function(e) {
  e.preventDefault();
  var str = $('input').val();
  if (str !== "") {
    //sync str with chrome storage
    defineArr(str);
    //broadcast to background
    chrome.runtime.sendMessage({}, function(response) {
      //get response
    });
  }
});
