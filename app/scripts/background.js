chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//listen for spoiler count from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.spoilerCount)
    if (request.spoilerCount) {
      sendResponse({success: "updated count in background"});
      var display = request.spoilerCount.toString();
      chrome.browserAction.setBadgeText({text: display});
    }
});
