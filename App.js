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
  View, SafeAreaView, StatusBar, Button, TouchableOpacity, Image
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
import LogoutButton from './scenes/components/LogoutButton';

import ADRFollowupScene from "./scenes/ADRFollowupScene"
import AEFIReportFollowupScene from './scenes/AEFIReportFollowupScene'
import SAEFollowupScene from "./scenes/SAEFollowupScene"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { setCurrentRouteName, changeConnection, setNotification } from './actions'
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import LoadingComponent from './scenes/components/LoadingComponent';
// var Fabric = require('react-native-fabric')
// var { Crashlytics } = Fabric

/**
  Main Screen routes.
*/


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

const SavedReportsNavigator = createStackNavigator();
const SavedReportsStack = () => {
  return (
    <SavedReportsNavigator.Navigator
      screenOptions={({ navigation, route }) => ({
        headerRight: (props) => (
          <Button title="Close" onPress={() => navigation.goBack()} />
        ),
        title: 'MCAZ - Saved reports',
      })}
    >
      <SavedReportsNavigator.Screen
        name={'SavedReportsScene'}
        component={SavedReportsScene}
      />
      <SavedReportsNavigator.Screen
        name={'ReportsListScene'}
        component={ReportsListScene}
      />
      <SavedReportsNavigator.Screen
        name={'ReadOnlyReportScene'}
        component={ReadOnlyReportScene}
      />
    </SavedReportsNavigator.Navigator>
  )
}

/*const SavedReportsNavigator = StackNavigator(SavedReportRoutes, {
  initialRouteName : 'SavedReportsScene', headerMode : 'float'
})
*/
const NewsNavigator = createStackNavigator();
const NewsStack = () => {
  return (
    <NewsNavigator.Navigator
      screenOptions={({ navigation, route }) => ({
        headerRight: (props) => (
          <Button title="Close" onPress={() => navigation.goBack()} />
        )
      })}
    >
      <NewsNavigator.Screen
        name={'NewsScene'}
        component={NewsScene}
        options={{
          headerTitle: 'News'
        }}
      />
    </NewsNavigator.Navigator>
  )
}

const ContactNavigator = createStackNavigator();
const ContactStack = () => {
  return (
    <ContactNavigator.Navigator
      screenOptions={({ navigation, route }) => ({
        headerRight: (props) => (
          <Button title="Close" onPress={() => navigation.goBack()} />
        )
      })}
    >
      <ContactNavigator.Screen
        name={'ContactUsScene'}
        options={{
          headerTitle: 'Contact us'
        }}
        component={ContactUsScene}
      />
    </ContactNavigator.Navigator>
  )
}


const MainNavigator = createStackNavigator();
const MainStack = () => {
  return (
    <MainNavigator.Navigator
      screenOptions={({ navigation, route }) => ({
        headerLeft: (props) => (
          <DrawerButton navigation={navigation} />
        ),
        headerRight: (props) => (
          <LogoutButton />
        )
      })}
    >
      <MainNavigator.Screen
        name={'MainScene'}
        component={MainScene}
        options={({ navigation, route }) => ({
          headerMode : 'float',
          headerLeft: (props) => (
            <DrawerButton navigation={navigation} />
          ),
          title: 'MCAZ - Home',
        })}
      />
      <MainNavigator.Screen
        name={'ADRScene'}
        component={ADRScene}
        options={{
          headerTitle: 'ADR Report form'
        }}
      />
      <MainNavigator.Screen
        name={'SAEFormScene'}
        component={SAEFormScene}
        options={{
          headerTitle: 'SAE Report form'
        }}
      />
      <MainNavigator.Screen
        name={'AEFIInvFormScene'}
        component={AEFIInvFormScene}
        options={{
          headerTitle: 'AEFI Investigation Form'
        }}
      />
      <MainNavigator.Screen
        name={'AEFIReportingFormScene'}
        component={AEFIReportingFormScene}
        options={{
          headerTitle: 'AEFI Report form'
        }}
      />
      <MainNavigator.Screen
        name={'ADRFollowupScene'}
        component={ADRFollowupScene}
      />
      <MainNavigator.Screen
        name={'AEFIReportFollowupScene'}
        component={AEFIReportFollowupScene}
        options={{
          headerTitle: 'AEFI Report Follow up'
        }}
      />
      <MainNavigator.Screen
        name={'SAEFollowupScene'}
        component={SAEFollowupScene}
        options={{
          headerTitle: 'SAE Follow up'
        }}
      />
    </MainNavigator.Navigator>
  )
}


const AuthStackNavigator = createStackNavigator();
const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name={'LoginScene'}
        component={LoginScene}
        options={{
          headerMode : 'float',
          title: 'MCAZ - Login',
        }}
      />
      <AuthStackNavigator.Screen
        name={'SignupScene'}
        component={SignupScene}
        options={{
          title: 'MCAZ - Signup',
        }}
      />
      <AuthStackNavigator.Screen
        name={'ResetPasswordScene'}
        component={ResetPasswordScene}
        options={{
          title: 'MCAZ - Reset password',
        }}
      />
    </AuthStackNavigator.Navigator>
  )
}

/**
  Routes rendered on the drawer.
*/
const DrawerRoutes = {
  Main: {
    screen: MainNavigator
  },
  NewsScene: {
    screen: NewsStack
  },
  SavedReports: {
    screen : SavedReportsStack
  },
  ContactUsScene: {
    screen : ContactStack
  }
}

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator initialRouteName="Home">
        <DrawerNavigator.Screen
          name="Home" component={MainStack}
        />
        <DrawerNavigator.Screen
          name={'News'}
          component={NewsStack}
        />
        <DrawerNavigator.Screen
          name={'Saved reports'}
          component={SavedReportsStack}
        />
        <DrawerNavigator.Screen
          name={'Contact us'}
          component={ContactStack}
        />
    </DrawerNavigator.Navigator>
  )
}
/* Drawer navigator.
const drawerNav = DrawerNavigator(DrawerRoutes, {
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  }
})*/

/**
  All routes for the app combined.
*/
/*const MainAppRoutes = {
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
})*/

class App extends Component<{}> {
  constructor(props, context) {
    super(props, context)
    this._getCurrentRouteName = this._getCurrentRouteName.bind(this)
    this.changeConnection = this.changeConnection.bind(this)
    this.state = {
      loading: props.loading,
    }
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            {this.props.token ? (
              <Drawer />
            ): <AuthStack />}
          </NavigationContainer>
          <LoadingComponent
            loading={this.state.loading}
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

  static getDerivedStateFromProps(props, state) {
    const newState = {}
    if (props.loading != state.loading) {
      return { loading: props.loading };
    }
    // newState.loading = props.loading;
    return null;
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    token: state.user.token,
    loading: state.loading
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
