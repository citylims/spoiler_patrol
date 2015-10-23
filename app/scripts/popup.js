var app = chrome.extension.getBackgroundPage();

init();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("updated storage");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.spoilerCount) {
    defineArray();
  }
});

function refresh() {
  chrome.runtime.sendMessage({refresh: true}, function(response) {
    console.log(response.success);
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
      console.log("add");
      addSync(arr, str);
    } else if (str && !bool) {
      console.log("remove");
      removeSync(arr, str);
    } else {
      refreshSettings(storage);
      updatePopup(arr);
    }
  });
};

function refreshSettings(storage, settings, arr) {
  console.log("refresh settings");
  var toggle = $("#refreshSettings").is(':checked')
  $('#refresSetting').attr('checked', toggle);
  storage.refreshSetting = toggle;
  console.log(storage);
  setArray(storage);
}

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
      console.log("match " + arr[i].title);
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

//popupContent
function updatePopup(arr) {
  console.log(arr);
  if (arr.length) {
    arr.reverse();
    $("#spoilers").empty();
    for (var i = 0; i < arr.length; i++) {
      $("#spoilers").append('<li><p class="title">'+ arr[i].title + '</p><span class="count"> ' + arr[i].count + '</span><span class="delete">X</span></li>');
    }
  } else {
    $("#spoilers").append('<h1>No Spoilers!</h1>');
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
  var str = $('input').val();
  if (str) {
    defineArray(str, true);
  }
});

$('#spoilers').on('click', '.delete', function() {
    var str = $(this).prevAll('p').text();
    $(this).closest('li').remove();
    defineArray(str, false);
});

$('#refreshSetting').on('click', function() {
  defineArray();
});
