'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//Listeners
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var display = request.message.toString();
  chrome.browserAction.setBadgeText({text: display});
})l

chrome.browserAction.onClicked.addListener(function() {
  //
})
