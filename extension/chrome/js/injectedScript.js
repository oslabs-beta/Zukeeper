/* 
  Grab the zustand application store variable and use it to set the state of the app to the current state of the devtool app.
  This is the time travel debugging feature. Additionally, send the initial store of the application on load to the devtool. 
*/
const store = window.store;

window.postMessage({
  body: "Innit",
  state: JSON.stringify(store),
});

window.addEventListener("message", (event) => {
  if (event.data.body === "TimeTravel") {
    const currState = event.data.TimeTravel;
    store.setState(currState);
  }
});
