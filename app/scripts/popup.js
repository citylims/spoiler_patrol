var app = chrome.extension.getBackgroundPage();

init();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("updated storage");
});

function init() {
  defineArray();
};

function refresh() {
  chrome.runtime.sendMessage({refresh: true}, function(response) {
    console.log(response.success);
  });
};

function defineArray(str, bool) {
  chrome.storage.sync.get(["spoilers"], function(result) {
    console.log(result);
    var arr = result.spoilers ? result.spoilers : [];
    if (str && bool) {
      console.log("add");
      addSync(arr, str);
    } else if (str && !bool) {
      console.log("remove");
      removeSync(arr, str);
    } else {
      updatePopup(arr);
    }
  });
};

function addSync(arr, str) {
  console.log(arr);
  arr.unshift(str);
  var jsonObj = {};
  jsonObj.spoilers = arr;
  setArray(jsonObj, arr);
};

function removeSync(arr, str) {
  console.log(arr);
  console.log(str);
  var index = arr.indexOf(str);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  var jsonObj = {};
  jsonObj.spoilers = arr;
  setArray(jsonObj, arr);
};

function setArray(obj, arr) {
  chrome.storage.sync.set(obj, function() {
    updatePopup(arr);
    refresh();
  })
}

//popupContent
function updatePopup(arr) {
  console.log(arr);
  if (arr.length) {
    arr.reverse();
    $("#spoilers").empty();
    for (var i = 0; i < arr.length; i++) {
      $("#spoilers").append('<li><p>'+ arr[i] + '</p><span class="delete">X</span></li>');
    }
  } else {
    $("#spoilers").append('<h1>No spoilers added</h1>');
  }
};

//////////////events//////////////

$('#searchWrap').bind('keypress', function(e) {
  if (e.which === 13) {
    spoilerInput();
  }
});

$("#addBtn").on('click', function(e) {
  e.preventDefault();
  spoilerInput();
})

$('#spoilers').on('click', '.delete', function() {
    var str = $(this).prev().text();
    $(this).closest('li').remove();
    defineArray(str, false);
});

function spoilerInput() {
  var str = $('input').val();
  if (str) {
    defineArray(str, true);
  }
}
