function hoist() {
  getArray();
  console.log('hoist')
}

function getArray() {
  chrome.storage.sync.get(["spoilers"], function(result) {
    console.log(result);
    noSpoilers(result);
  })
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.refresh) {
    alert("Message recieved!");
  }
});

var noSpoilers = function(obj) {
  var spoilers = obj.spoilers
  var count = 0;

  for (var i = 0; i < spoilers.length; i++) {
    spoilerSearch(spoilers[i]);
  }

  function spoilerSearch(word) {
    var str = word;
    if (str === '') {
      return;
    }
    var regex = new RegExp('\\b' + str + '\\b', 'gi');
    var matchRegex = $(document.body).text().match(regex);
    var matchCount = matchRegex ? matchRegex.length : 0;
    count += matchCount;
  };

  console.log(count);
  chrome.runtime.sendMessage({spoilerCount: count}, function(response) {
    console.log(response.success);
  });
};

hoist();
