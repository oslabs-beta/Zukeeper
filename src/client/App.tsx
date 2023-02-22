import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { ActionsDispatched } from './components/ActionsDispatched';
import { VisualizationContainer } from './components/VisualizationContainer';
import useExtensionStore from './store/useExtensionStore';
import { useStore } from 'zustand';
import './App.scss';

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
  } = useStore(useExtensionStore);

  // let connected: boolean = false;
  console.log('rerender')
  const connect = (): void => {
    port = chrome.runtime.connect();
    // connected = true;
    port.onMessage.addListener(
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

  useEffect(() => {
    connect();
    //disconnects port when user leaves the dev -- double check this
    window.addEventListener('beforeunload', () => {
      port.disconnect();
    });
  }, []);


  useEffect(() => {
      console.log('port', port)
      if (timeTravel){
        port.postMessage({
          body: 'TimeTravel',
          TimeTravel: currState,
        });
        setTimeTravel(false);
      }
  }, [timeTravel]);

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
