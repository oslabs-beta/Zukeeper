// declare port connection with App.tsx
let devToolPort;
// declare current tab
let developerTab;

// listens for message from App.tsx
chrome.runtime.onConnect.addListener((port) => {
  devToolPort = port;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    developerTab = tabs[0];
  });

  // listen for time travel message and send message to content script
  devToolPort.onMessage.addListener((message, sender, sendResponse) => {
    if (message.body === "TimeTravel") {
      chrome.tabs.sendMessage(developerTab.id, {
        body: "TimeTravel",
        TimeTravel: message.TimeTravel,
      });
    }
  });
});

// listens for messages from content script to send to App.tsx
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (devToolPort) {
    if (message.body === "Data" && message.state !== undefined) {
      devToolPort.postMessage({
        body: message.body,
        state: JSON.parse(message.state),
        actions: message.actions,
      });
    }
    if (message.body === "Innit" && message.state !== undefined) {
      devToolPort.postMessage({
        body: message.body,
        state: JSON.parse(message.state),
      });
    }
  }
});

// on tab update, reset state of devtool
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (developerTab) {
    if (tabId === developerTab.id) {
      devToolPort.postMessage({
        body: "Reset",
      });
    }
  }
});
