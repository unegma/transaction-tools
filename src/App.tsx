import React from 'react';
import './App.css';
import MainInput from "./components/MainInput";
import Web3 from "web3";
const INFURA_APP_KEY="c21e9e5987664f8c963c179d9bd87fa0"; // not secret key // todo restrict to only transaction.tools
const INFURA_ENDPOINT="wss://mainnet.infura.io/ws/v3/";

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    `${INFURA_ENDPOINT}${INFURA_APP_KEY}`,
    {
      timeout: 30000, // ms

      clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },

      // Enable auto reconnection
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    }
  )
);


function App() {
  return (
    <div className="App">
      <div className="App-body">
        <MainInput componentProps={{web3}}></MainInput>
      </div>
    </div>
  );
}

export default App;
