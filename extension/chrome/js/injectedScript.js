// Figure out a way to not use window object

window.addEventListener('message', (event) => {
  store = window.store;
  if (event.data.body === 'TimeTravel') {
    const currState = event.data.TimeTravel
    console.log('is this working', currState)
    store.setState(currState);
  }
});