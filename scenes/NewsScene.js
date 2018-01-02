import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, login } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'

class NewsScene extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  constructor(props, context) {
    super(props, context)
    const { token } = this.props
    this.state = { "email" : "", password: "", token : token }

  }

  render() {
    const completedCount = this.props.completed.length
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>

      </ScrollView>
    );
  }

  componentDidMount() {
    const { token } = this.state
    if(token != null) {
      const { navigate } = this.props.navigation;
      const navigateAction = NavigationActions.navigate({
        routeName: 'Main',
        params: {},
        action: NavigationActions.navigate({ routeName: 'MainScene'})
      })
      this.props.navigation.dispatch(navigateAction)
      //navigate("MainScene")
    }
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      /**/
      const { currentRoute } = this.props

      if(currentRoute != null) {
        if(currentRoute.name == this.props.navigation.state.routeName) {
          this.exitApp()
        }
      }
      //
      return false;
    }.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  exitApp = () => {
    BackHandler.exitApp()
  }


  showAlert = (notification) => {
    const title = notification.title != null? notification.title : "info"
    Alert.alert(title, notification.message, )
  }
}

const mapStateToProps = state => {
  return {
    user: state.appState.news,
    currentRoute: state.appState.currentRoute
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeConnection: (isConnected) => {
      dispatch(changeConnection(isConnected))
    },
    uploadCompletedReports: (reports) => {
      dispatch(uploadCompletedReports(reports))
    },
    login: data => {
      dispatch(login(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScene)
