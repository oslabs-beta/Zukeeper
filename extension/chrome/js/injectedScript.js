// Figure out a way to not use window object
store = window.store;

window.postMessage({
  body: 'Innit',
  state: JSON.stringify(store),
});


window.addEventListener('message', (event) => {
  if (event.data.body === 'TimeTravel') {
    const currState = event.data.TimeTravel
    store.setState(currState);
  }
});

