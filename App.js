/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainScene  from './scenes/MainScene'
import ADRScene from './scenes/ADRScene'
import SAEFormScene from './scenes/SAEFormScene'
import AEFIInvFormScene from './scenes/AEFIInvFormScene'
import AEFIReportingFormScene from './scenes/AEFIReportingFormScene'
import LoadingScene from './scenes/components/LoadingScene'
import SavedReportsScene from './scenes/SavedReportsScene'
import ReportsListScene from './scenes/ReportsListScene'
import ADRSceneTabbed from './scenes/ADRSceneTabbed'
import AEFIInvFormSceneTabbed from './scenes/AEFIInvFormSceneTabbed'
import SAEFormSceneTabbed from './scenes/SAEFormSceneTabbed'
import AEFIReportingFormSceneTabbed from './scenes/AEFIReportingFormSceneTabbed'

import { StackNavigator } from 'react-navigation'

import { Provider } from 'react-redux'
import pvStore from './store'

import { PersistGate } from 'redux-persist/lib/integration/react'

const MainRoutes = {
  MainScene : {
    name : "CTR PV",
    screen : MainScene
  },
  ADRScene : {
    name : "ADR Report Form",
    screen : ADRScene
  },
  SAEFormScene: {
    screen : SAEFormScene
  },
  AEFIInvFormScene: {
    screen : AEFIInvFormScene
  },
  AEFIReportingFormScene: {
    screen : AEFIReportingFormScene
  },
  ADRSceneTabbed: {
    screen: ADRSceneTabbed
  },
  AEFIInvFormSceneTabbed: {
    screen: AEFIInvFormSceneTabbed
  },
  SAEFormSceneTabbed: {
    screen: SAEFormSceneTabbed
  },
  AEFIReportingFormSceneTabbed: {
    screen: AEFIReportingFormSceneTabbed
  }
}

const SavedReportRoutes = {
  SavedReportsScene: {
    screen : SavedReportsScene
  },
  ReportsListScene: {
    screen: ReportsListScene
  }
}

const SavedReportsNavigator = StackNavigator(SavedReportRoutes, {
  initialRouteName : 'SavedReportsScene', headerMode : 'float'
})

const MainNavigator = StackNavigator(MainRoutes, {
  initialRouteName : 'MainScene', //headerMode: "none"
})

const MainAppRoutes = {
  Main: {
    screen: MainNavigator
  },
  SavedReports: {
    screen : SavedReportsNavigator
  }
}

const MainAppNavigator = StackNavigator(MainAppRoutes, {
  initialRouteName : 'Main', headerMode: "none", mode : 'modal'
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const { store, persistor} = pvStore({})

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={ persistor } store={ store } loading={ <LoadingScene /> }>
          <MainAppNavigator ref={nav => { this.navigator = nav; }} />
        </PersistGate>
      </Provider>
    )
  }
}

/*return (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit App.js
    </Text>
    <Text style={styles.instructions}>
      {instructions}
    </Text>
  </View>
);*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
