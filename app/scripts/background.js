chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: 'content.js'
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    //get spoiler count
    if (request.spoilerCount) {
      var display = request.spoilerCount.toString();
      chrome.browserAction.setBadgeText({text: display});
      sendResponse({success: "page spoiler count " + display});
    }
    else {
      chrome.browserAction.setBadgeText({text: "0"});
      sendResponse({success: "no matched spoilers"});
    }
    //refresh tabs
    if(request.refresh) {
      console.log("yeeeeee");
      sendResponse({success: "Success"});
      // chrome.runtime.reload();
      refreshTabs();
    }
});


function refreshTabs() {
  console.log("update")
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      console.log(tab);
      chrome.tabs.executeScript(tab.id, { file: "scripts/content.js" }, function() {});
    });
  });
}
