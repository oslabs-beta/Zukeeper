// content script listening for message from the injected script/window and sends message to background
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.body === 'TimeTravel') {
    window.postMessage({body: 'TimeTravel', TimeTravel: req.TimeTravel});
  }
});

function injectScript(file) {
  const body = document.getElementsByTagName('body')[0];
  const s = document.createElement('script'); 
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', chrome.runtime.getURL(file));
  body.appendChild(s);
}

injectScript('./js/injectedScript.js');