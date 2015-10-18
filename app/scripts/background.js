chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.storage.sync.get('value', function(items) {
  console.log(items);
  var allKeys = Object.keys(items);
  console.log(allKeys);
});

//listen for spoiler count
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  var display = request.message;
  var count = request.length;
  console.log(count);
  chrome.browserAction.setBadgeText({text: count});
});

//listen for popup events
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.add) {
    console.log("add spoiler");
    sendResponse(request.add);
  }
  else {
    console.log("debug");
  }
});

function backgroundFunction () {
  return "backgroundFunction"
}
