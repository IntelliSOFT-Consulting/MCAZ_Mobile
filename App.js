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
  View, NetInfo
} from 'react-native';

import MainScene  from './scenes/MainScene'
import LoginScene  from './scenes/LoginScene'
import ResetPasswordScene from './scenes/ResetPasswordScene'
import SignupScene from './scenes/SignupScene'
import ADRScene from './scenes/ADRScene'
import SAEFormScene from './scenes/SAEFormScene'
import AEFIInvFormScene from './scenes/AEFIInvFormScene'
import AEFIReportingFormScene from './scenes/AEFIReportingFormScene'
import LoadingScene from './scenes/components/LoadingScene'
import SavedReportsScene from './scenes/SavedReportsScene'
import ReportsListScene from './scenes/ReportsListScene'
import ReadOnlyReportScene from './scenes/ReadOnlyReportScene'
import ContactUsScene from './scenes/ContactUsScene'
import NewsScene from './scenes/NewsScene'

import DrawerButton from './scenes/components/DrawerButton'

import ADRFollowupScene from "./scenes/ADRFollowupScene"
import AEFIReportFollowupScene from './scenes/AEFIReportFollowupScene'
import SAEFollowupScene from "./scenes/SAEFollowupScene"

import { StackNavigator, addNavigationHelpers, DrawerNavigator } from 'react-navigation'

import { setCurrentRouteName, changeConnection } from './actions'

import { Provider } from 'react-redux'
import pvStore from './store'

import { PersistGate } from 'redux-persist/lib/integration/react'

var Fabric = require('react-native-fabric')
var { Crashlytics } = Fabric

/**
  Main Screen routes.
*/
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
  ADRFollowupScene: {
    screen: ADRFollowupScene
  },
  AEFIReportFollowupScene: {
    screen: AEFIReportFollowupScene
  },
  SAEFollowupScene: {
    screen: SAEFollowupScene
  }
}

/**
  Login and signup routes.
*/
const AuthRoutes = {
  LoginScene: {
    screen : LoginScene
  },
  SignupScene: {
    screen : SignupScene
  },
  ResetPasswordScene : {
    screen : ResetPasswordScene
  }
}

/**
  Saved reports routes.
*/
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

/**
  News Routes.
*/
const NewsRoutes = {
  NewsScene: {
    screen: NewsScene
  }
}

/**
  Contact us routes.
*/
const ContactRoutes = {
  ContactUsScene: {
    screen : ContactUsScene
  },
}

const SavedReportsNavigator = StackNavigator(SavedReportRoutes, {
  initialRouteName : 'SavedReportsScene', headerMode : 'float'
})

const NewsNavigator = StackNavigator(NewsRoutes, {
  headerMode : 'float'
})

const ContactNavigator = StackNavigator(ContactRoutes, {
  headerMode : 'float'
})

const MainNavigator = StackNavigator(MainRoutes, {
  initialRouteName : 'MainScene', //headerMode: "none"
  navigationOptions : ({ navigation }) => {
    return {
      headerLeft: (
        <DrawerButton navigation={ navigation }/>
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    }
  }
})

const AuthNavigator = StackNavigator(AuthRoutes, {
  initialRouteName : 'LoginScene', headerMode : 'float'
})

/**
  Routes rendered on the drawer.
*/
const DrawerRoutes = {
  Main: {
    screen: MainNavigator
  },
  NewsScene: {
    screen: NewsNavigator
  },
  SavedReports: {
    screen : SavedReportsNavigator
  },
  ContactUsScene: {
    screen : ContactNavigator
  }
}
// Drawer navigator.
const drawerNav = DrawerNavigator(DrawerRoutes, {
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
})

/**
  All routes for the app combined.
*/
const MainAppRoutes = {
  Main: {
    screen: drawerNav //MainNavigator
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

export default class App extends Component<{}> {
  constructor(props, context) {
    super(props, context)
    this._getCurrentRouteName = this._getCurrentRouteName.bind(this)
    this.changeConnection = this.changeConnection.bind(this)
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={ persistor } store={ store } loading={ <LoadingScene /> }>
          <MainAppNavigator ref={ nav => { this.navigator = nav; }} screenProps={ this.state }
            onNavigationStateChange={(prevState, currentState) => {
            this._getCurrentRouteName(currentState)
          }}
            />
        </PersistGate>
      </Provider>
    )
  }

  _getCurrentRouteName(navState) {
    if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index])
    } else {
        store.dispatch(setCurrentRouteName(navState.routeName))
    }
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

  changeConnection(isConnected) {
    console.log(isConnected)
    store.dispatch(changeConnection(isConnected))
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      store.dispatch(changeConnection(isConnected))
    }).done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.changeConnection);
    });
  }
}
