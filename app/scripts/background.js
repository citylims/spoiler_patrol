chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//listen for spoiler count from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.spoilerCount)
    if (request.spoilerCount) {
      var display = request.spoilerCount.toString();
      chrome.browserAction.setBadgeText({text: display});
      sendResponse({success: "page spoiler count " + display});
    }
    else {
      chrome.browserAction.setBadgeText({text: "0"});
      sendResponse({success: "no matched spoilers"})
    }
});
