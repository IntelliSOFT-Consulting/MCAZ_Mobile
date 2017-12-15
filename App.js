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
import LoginScene  from './scenes/LoginScene'
import SignupScene from './scenes/SignupScene'
import ADRScene from './scenes/ADRScene'
import SAEFormScene from './scenes/SAEFormScene'
import AEFIInvFormScene from './scenes/AEFIInvFormScene'
import AEFIReportingFormScene from './scenes/AEFIReportingFormScene'
import LoadingScene from './scenes/components/LoadingScene'
import SavedReportsScene from './scenes/SavedReportsScene'
import ReportsListScene from './scenes/ReportsListScene'
import ReadOnlyReportScene from './scenes/ReadOnlyReportScene'

import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import { Provider } from 'react-redux'
import pvStore from './store'

import { PersistGate } from 'redux-persist/lib/integration/react'

var Fabric = require('react-native-fabric')
var { Crashlytics } = Fabric

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
  }
}

const AuthRoutes = {
  LoginScene: {
    screen : LoginScene
  },
  SignupScene: {
    screen : SignupScene
  }
}

const SavedReportRoutes = {
  SavedReportsScene: {
    screen : SavedReportsScene
  },
  ReportsListScene: {
    screen: ReportsListScene
  },
  ReadOnlyReportScene: {
    screen: ReadOnlyReportScene
  }
}

const SavedReportsNavigator = StackNavigator(SavedReportRoutes, {
  initialRouteName : 'SavedReportsScene', headerMode : 'float'
})

const MainNavigator = StackNavigator(MainRoutes, {
  initialRouteName : 'MainScene', //headerMode: "none"
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
})

const AuthNavigator = StackNavigator(AuthRoutes, {
  initialRouteName : 'LoginScene', headerMode : 'float'
})

const MainAppRoutes = {
  Main: {
    screen: MainNavigator
  },
  SavedReports: {
    screen : SavedReportsNavigator
  },
  Auth: {
    screen: AuthNavigator
  }
}

const { store, persistor} = pvStore({})

const initial = (store.getState() != null && store.getState().token != null)? 'Main' : 'Auth'
const MainAppNavigator = StackNavigator(MainAppRoutes, {
  initialRouteName : initial, headerMode: "none", mode : 'modal', navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={ persistor } store={ store } loading={ <LoadingScene /> }>
          <MainAppNavigator ref={ nav => { this.navigator = nav; }} screenProps={ this.state }
            onNavigationStateChange={(prevState, currentState) => {
            console.log(currentState.index)
            console.log(currentState)
            this.setState(currentState)
          }}
            />
        </PersistGate>
      </Provider>
    )
  }

  /**
    Handle crash reporting.
  */
  componentWillMount() {
    ErrorUtils._globalHandler = function(...args){
      defaultHandler(...args);
      Crashlytics.logException(args);
      // other custom handler
    };
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
