chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    console.log('Extension icon clicked, sending message to tab:', tab.id);
    chrome.tabs.sendMessage(
      tab.id, 
      { action: 'toggle_ui' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Response from content script:', response);
        }
      }
    );
  }
});
