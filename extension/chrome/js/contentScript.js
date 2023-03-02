/* 
  Content script listening for message from the injected script/window and sends message to background.
  The messages are emitted from zukeeper middleware
*/
window.addEventListener("message", (event) => {
  chrome.runtime.sendMessage(event.data);
});

// listens for message from background and sends it to window to update store of Zustand application
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.body === "TimeTravel") {
    window.postMessage({ body: "TimeTravel", TimeTravel: req.TimeTravel });
  }
});

// inject injectedScript.js
function injectScript(file) {
  const body = document.getElementsByTagName("body")[0];
  const s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", chrome.runtime.getURL(file));
  body.appendChild(s);
}

injectScript("./js/injectedScript.js");
