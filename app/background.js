chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//refresh for new tab
chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    refeshScript();
});

//refresh for active tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      refreshScript();
    });
});

//refresh for current tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
    chrome.tabs.query({'active': true}, function (activeTabs) {
        var activeTab = activeTabs[0];
        if (activeTab == updatedTab) {
          refreshScript();
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.spoilerCount) {
      console.log("spoilerCount:" + request.spoilerCount);
      var display = request.spoilerCount.toString();
      chrome.browserAction.setBadgeText({text: display});
      sendResponse({success: "page spoiler count " + display});
    } else {
      chrome.browserAction.setBadgeText({text: "0"});
      sendResponse({success: "no matched spoilers"});
    }
    if (request.refresh) {
      sendResponse({success: "Success"});
      refreshTabs();
    }
});

function refreshScript() {
  chrome.tabs.executeScript({ file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript({ file: "scripts/content.js" });
  });
}

function refreshTabs() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(tab.id, { file: "scripts/content.js" }, function() {});
    });
  });
}
