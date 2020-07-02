import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, resetPassword } from '../actions'
import { connect } from 'react-redux'

import { TextField } from 'react-native-material-textfield'

class ResetPasswordScene extends Component {
  static navigationOptions = {
    title: 'MCAZ - Reset Password',
  }
  constructor(props, context) {
    super(props, context)
    this.state = { email : "" }
  }

  handleChange = (name, value) => {
    var state = {}
    state[name] = value
    this.setState(state)
  }

  resetPassword = () => {
    if(this.state.email == "") {
      Alert.alert("Error", "Email must be provided.")
    } else {
      const { resetPassword } = this.props
      var data = {}
      data.email = this.state.email
      resetPassword(data)
    }
  }

  login = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer } keyboardShouldPersistTaps={'handled'}>
        <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
        <TextField {...this.props}
          label="Email"
          value={ this.state.email } keyboardType="email-address"
          onChangeText={ (text) => this.handleChange("email", text) }
        />

        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button onPress={ this.resetPassword } title={ "Reset password" }/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.login } title={ "Back to login" }/>
          </View>
        </View>
      </ScrollView>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.state
    const nextToken = nextProps.token
    // Signup success, navigate to main page
    if(token == null && nextToken != null) {
      const { navigate } = this.props.navigation;
      navigate("MainScene")
    }
    const { notification } = this.props
    const nextNotification = nextProps.notification
    if(this.props.currentRoute != null && this.props.currentRoute.name == this.props.navigation.state.routeName) {
      if(nextNotification && ((notification && notification.id != nextNotification.id) || notification == null)) {
        this.showAlert(nextNotification)
      }
    }
  }

  showAlert = (notification) => {
    const title = notification.title != null? notification.title : "info"
    Alert.alert(title, notification.message, )
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    completed : state.appState.completed,
    notification: state.appState.notification,
    token: state.appState.user.token,
    currentRoute: state.appState.currentRoute
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeConnection: (isConnected) => {
      dispatch(changeConnection(isConnected))
    },
    resetPassword: (email) => {
      dispatch(resetPassword(email))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScene)
