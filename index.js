import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import LoadingScene from './scenes/components/LoadingScene';
import { Provider } from 'react-redux'
import pvStore from './store'

import { PersistGate } from 'redux-persist/lib/integration/react';

const { store, persistor} = pvStore({})

export default class ConnectedApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={ persistor } store={ store } loading={ <LoadingScene /> }>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MCAZPV', () => ConnectedApp);
