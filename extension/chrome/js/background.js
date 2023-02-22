//declare background port
let devToolPort;
let developerTab;

chrome.runtime.onConnect.addListener((port) => {
  devToolPort = port;
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    developerTab = tabs[0];
  });
  
  devToolPort.onMessage.addListener((message, sender, sendResponse) => {
    console.log(developerTab)
    if (message.body === 'TimeTravel') {
      chrome.tabs.sendMessage(developerTab.id, {
        body: 'TimeTravel',
        TimeTravel: message.TimeTravel
      });
    }  
  })
});

//listens for messages from content script and can then send messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (devToolPort) {
    if (request.body === 'Data') {
      devToolPort.postMessage({
        body: request.body,
        state: JSON.parse(request.state),
        actions: request.actions,
      });
    };
    if (request.body === 'Innit') {
      devToolPort.postMessage({
        body: request.body,
        state: JSON.parse(request.state)});
    };
  };
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tabId === developerTab) {
    devToolPort.postMessage({
      body: 'Reset',
    });
  }
});
