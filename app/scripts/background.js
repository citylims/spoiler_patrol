chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  console.log(allKeys);
});

//listen for spoiler count
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var display = request.message.toString();
  chrome.browserAction.setBadgeText({text: display});
});

//listen for popup events
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.add) {
    console.log("add spoiler");
  }
  else {
    console.log("debug");
  }
});

function backgroundFunction () {
  return "backgroundFunction"
}
