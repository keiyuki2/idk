chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"],
    }, () => {
      chrome.tabs.sendMessage(tab.id!, { action: "toggleOverlay" });
    });
  }
});


