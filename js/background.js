chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(tab.id, {file: "css/selector.css"});

  chrome.tabs.executeScript(tab.id, {file: "lib/jquery-2.2.0.min.js"});
  chrome.tabs.executeScript(tab.id, {file: "lib/jquery.htmlClean.js"});
  chrome.tabs.executeScript(tab.id, {file: "js/selector.js"});
});
