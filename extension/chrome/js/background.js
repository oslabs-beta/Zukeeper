//declare background port
let backgroundPort;
let developerTab;

chrome.runtime.onConnect.addListener((port) => {
  backgroundPort = port;
  chrome.tabs.query(
    { windowId: chrome.windows.WINDOW_ID_CURRENT, active: true },
    (tabs) => {
      developerTab = tabs['0'].id;
    }
  );
});

//listens for messages from content script and can then send messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (backgroundPort) {
    if (request.body === 'Data') {
      backgroundPort.postMessage({
        body: request.body,
        state: JSON.parse(request.state),
        actions: request.actions,
      });
    };
    if (request.body === 'Innit') {
      backgroundPort.postMessage({
        body: request.body,
        state: JSON.parse(request.state)});
    };
  };
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tabId === developerTab) {
    backgroundPort.postMessage({
      body: 'Reset',
    });
  }
});
