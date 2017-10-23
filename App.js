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

import { StackNavigator } from 'react-navigation'

import { Provider } from 'react-redux'
import pvStore from './store'

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
  }
}

const MainNavigator = StackNavigator(MainRoutes, {
  initialRouteName : 'MainScene', //headerMode: "none"
})

const MainAppRoutes = {
  Main: {
    screen: MainNavigator
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

const store = pvStore({})

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <MainAppNavigator ref={nav => { this.navigator = nav; }} />
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
