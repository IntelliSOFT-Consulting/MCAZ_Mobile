/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  View, SafeAreaView, StatusBar
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import MainScene  from './scenes/MainScene'
import LoginScene  from './scenes/LoginScene'
import ResetPasswordScene from './scenes/ResetPasswordScene'
import SignupScene from './scenes/SignupScene'
import ADRScene from './scenes/ADRScene'
import SAEFormScene from './scenes/SAEFormScene'
import AEFIInvFormScene from './scenes/AEFIInvFormScene'
import AEFIReportingFormScene from './scenes/AEFIReportingFormScene'

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

import { setCurrentRouteName, changeConnection, setNotification } from './actions'
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";

// var Fabric = require('react-native-fabric')
// var { Crashlytics } = Fabric

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

// const initial = (store.getState() != null && store.getState().token != null)? 'Main' : 'Auth'
const MainAppNavigator = StackNavigator(MainAppRoutes, {
  initialRouteName : 'Auth', headerMode: "none", mode : 'modal', navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
})

class App extends Component<{}> {
  constructor(props, context) {
    super(props, context)
    this._getCurrentRouteName = this._getCurrentRouteName.bind(this)
    this.changeConnection = this.changeConnection.bind(this)
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <MainAppNavigator ref={ nav => { this.navigator = nav; }} screenProps={ this.state }
                  onNavigationStateChange={(prevState, currentState) => {
                  this._getCurrentRouteName(currentState)
                }}
          />
        </SafeAreaView>
      </>
    )
  }

  _getCurrentRouteName(navState) {
    if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index])
    } else {
      this.props.setCurrentRouteName(navState.routeName)
    }
  }

  changeConnection(isConnected) {
    console.log(isConnected)
    this.props.changeConnection(isConnected);
  }

  componentDidMount() {
    ErrorUtils._globalHandler = function(...args){
      defaultHandler(...args);
      // Crashlytics.logException(args);
      // other custom handler
    };
    NetInfo.addEventListener(state => {
      this.props.changeConnection(state.isConnected)
      console.log(state.type);
    });
    /*NetInfo.isConnected.fetch().then(isConnected => {
      store.dispatch(changeConnection(isConnected))
    }).done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.changeConnection);
    });*/
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }

    const { notification } = this.props
    const prevNotification = prevProps.notification
    if (notification && (!prevNotification || (prevNotification.id != notification.id))) {
      Alert.alert("info", notification.message, [
        { text: 'OK', onPress: () => this.props.setNotification({ id: null, message: null })}
      ])
    }
  }
}

const mapStateToProps = state => {
  return {
    notification: state.appState.notification,
    token: state.appState.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNotification: () => {
      dispatch(setNotification())
    },
    changeConnection: (connection) => dispatch(changeConnection(connection)),
    setCurrentRouteName: (routeName) => dispatch(setCurrentRouteName(routeName)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
