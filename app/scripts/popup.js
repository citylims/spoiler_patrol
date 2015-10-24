var app = chrome.extension.getBackgroundPage();

init();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  defineArray();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.spoilerCount) {
    defineArray();
  }
});

function refresh() {
  chrome.runtime.sendMessage({refresh: true}, function(response) {
    defineArray();
  });
};

function init() {
  defineArray();
};

function defineArray(str, bool) {
  chrome.storage.sync.get(["spoilers"], function(result) {
    var storage = result;
    var arr = result.spoilers ? result.spoilers : [];
    if (str && bool) {
      addSync(arr, str);
    } else if (str && !bool) {
      removeSync(arr, str);
    } else {
      updatePopup(arr);
    }
  });
};

function addSync(arr, str) {
  var spoiler = {
    title: str,
    count: 0
  };
  arr.push(spoiler);
  jsonObj = {};
  jsonObj.spoilers = arr;
  setArray(jsonObj);
};

function removeSync(arr, str) {
  for (var i = 0; i < arr.length; i ++) {
    if (arr[i].title === str) {
      arr.splice(i, 1);
      var jsonObj = {};
      jsonObj.spoilers = arr;
      setArray(jsonObj);
      break;
    }
  }
};

function setArray(obj) {
  chrome.storage.sync.set(obj, function() {
    refresh();
  })
}

//DOM
function updatePopup(arr) {
  if (arr.length) {
    arr.reverse();
    $("#spoilers").empty();
    for (var i = 0; i < arr.length; i++) {
      $("#spoilers").append('<li><p class="title">'+ arr[i].title + '</p><span class="count"> ' + arr[i].count + '</span><span class="delete">×</span></li>');
    }
  } else {
    $("#spoilers").append('<h1 class="empty-message">No Spoilers!</h1>');
  }
};

$('#searchWrap').bind('keypress', function(e) {
  if (e.which === 13) {
    spoilerInput();
  }
});

$("#addBtn").on('click', function(e) {
  e.preventDefault();
  spoilerInput();
});

$('#spoilers').on('click', '.delete', function() {
    var str = $(this).prevAll('p').text();
    $(this).closest('li').remove();
    defineArray(str, false);
});

function spoilerInput() {
  var str = $('input').val();
  if (str) {
    $('input').val("");
    defineArray(str, true)
  }
}
