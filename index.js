import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import LoadingScene from './scenes/components/LoadingScene';
import { Provider } from 'react-redux'
import { configureStore } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

const configuredStore = configureStore({});

export default class ConnectedApp extends Component {
  render() {
    return (
      <Provider store={configuredStore.store}>
        <PersistGate persistor={configuredStore.persistedStore} store={ configuredStore.store } loading={ <LoadingScene /> }>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MCAZPV', () => ConnectedApp);
