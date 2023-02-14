// content script listening for message from the injected script/window and sends message to background
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});
