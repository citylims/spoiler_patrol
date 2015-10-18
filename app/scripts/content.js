function hoist() {
  getArray();
}

var noSpoilers = function(obj) {
  var spoilers = obj.spoilers
  var count = 0;
  for (var i = 0; i < spoilers.length; i++) {
    console.log(spoilers[i]);
    spoilerSearch(spoilers[i]);
  }

  function spoilerSearch(word) {
    console.log(word);
    var str = word;
    if (str === '') {
      return;
    }
    var regex = new RegExp('\\b' + str + '\\b', 'gi');
    var matchRegex = $(document.body).text().match(regex);
    var matchCount = matchRegex ? matchRegex.length : 0;
    console.log(matchCount);
    count += matchCount;
  }
  console.log(count);
  chrome.runtime.sendMessage({spoilerCount: count}, function(response) {
    console.log(response.success);
  });
}

function getArray() {
  chrome.storage.sync.get(["spoilers"], function(result) {
    noSpoilers(result);
  })
}

hoist();
