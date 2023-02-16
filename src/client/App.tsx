import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { ActionsDispatched } from './components/ActionsDispatched';
import { VisualizationContainer } from './components/VisualizationContainer';
import useExtensionStore from './store/useExtensionStore';
import { useStore } from 'zustand';
import './App.scss';

const App = () => {
  const {
    addPreviousState,
    addActionDispatched,
    resetState,
    setInitialState,
    previousStates,
    initialState,
  } = useStore(useExtensionStore);

  let mainPort: any;
  let connected: boolean = false;

  const connect = (): void => {
    //connects devtool to inspected page
    if (!connected) {
      mainPort = chrome.runtime.connect();
      connected = true;
    }

    if (connected) {
      //listening for messages from background.js
      mainPort.onMessage.addListener(
        (
          message: any,
          sender: chrome.runtime.MessageSender,
          sendResponse: Function
        ) => {
          if (message.body === 'Data') {
            addPreviousState(message.state);
            addActionDispatched(message.actions);
          }
          if (message.body === 'Innit') {
            setInitialState(message.state);
          }
          if (message.body === 'Reset') {
            resetState();
          }
        }
      );
    }
  };

  useEffect(() => {
    connect();
    //disconnects port when user leaves the dev
    window.addEventListener('beforeunload', () => {
      mainPort.disconnect();
    });
  }, []);

  return (
    <>
      <Header />
      <div id="display-container">
        <ActionsDispatched />
        <VisualizationContainer />
      </div>
    </>
  );
};

export default App;
