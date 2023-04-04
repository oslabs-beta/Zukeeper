import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { ActionsDispatched } from "./components/ActionsDispatched";
import { VisualizationContainer } from "./components/VisualizationContainer";
import useExtensionStore from "./store/useExtensionStore";
import { useStore } from "zustand";
import "./App.scss";

let port;

const App = () => {
  const {
    addPreviousState,
    addActionDispatched,
    resetState,
    setInitialState,
    currState,
    timeTravel,
    setTimeTravel,
    initialState,
    reset,
    setReset,
  } = useStore(useExtensionStore);

  const listenerCallback = (message: any) => {
    if (message.body === "Data") {
      addPreviousState(message.state);
      addActionDispatched(message.actions);
    }
    if (message.body === "Innit") {
      setInitialState(message.state);
    }
    if (message.body === "Reset") {
      resetState();
    }
  }

  const connect = (): void => {
    // connect to port
    port = chrome.runtime.connect();

    // listen for messages from background
    port.onMessage.addListener(listenerCallback);
  };

  useEffect(() => {
    connect();

    // clean-up
    return () => {
      port.onMessage.removeEventListener(listenerCallback);
      port.disconnect();
    }
  }, []);

  // send message to background with currState for time travel
  useEffect(() => {
    if (timeTravel) {
      port.postMessage({
        body: "TimeTravel",
        TimeTravel: currState,
      });
      setTimeTravel(false);
    }
  }, [timeTravel]);

  // send message to background with initialState for resetting state
  useEffect(() => {
    resetState();
    if (reset) {
      port.postMessage({
        body: "TimeTravel",
        TimeTravel: initialState,
      });
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      <Header />
      <main id="display-container">
        <ActionsDispatched />
        <VisualizationContainer />
      </main>
    </>
  );
};

export default App;
