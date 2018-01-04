import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, contactUs, login } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'

class ContactUsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Contact us',
      headerRight: (
        <Button
          title="Close"
          onPress={
            () => navigation.goBack(null)
          }
        />
      )
    }
  }
  constructor(props, context) {
    super(props, context)
    const { token } = this.props
    this.state = { "email" : "", message: "", token : token }

  }

  handleChange = (name, value) => {
    var state = {}
    state[name] = value
    this.setState(state)
  }

  send = () => {
    if(this.state.email != '' && this.state.message != '') {
      this.sendMessage()
    } else {
      this.showAlert({ title : "error", message : "Enter email and message"})
    }
  }

  sendMessage = () => {
    const { contactUs } = this.props
    var data = {}
    data.email = this.state.email
    data.message = this.state.message
    contactUs(data)

    const { goBack } = this.props.navigation
    goBack()
  }

  signup = () => {
    const { navigate } = this.props.navigation;
    navigate("SignupScene")
  }

  render() {

    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextField {...this.props}
          label="Email" returnKeyType='next'
          value={ this.state.email } keyboardType="email-address"
          onChangeText={ (text) => this.handleChange("email", text) }
        />
        <TextField
          label="Message"
          returnKeyType='next'
          multiline={true}
          value={ this.state.message }
          onChangeText={ (text) => this.handleChange("message", text) }
        />
        <View style={ AppStyles.contactUsButtons }>
          <Button onPress={ this.goBack } title={ "Cancel" }/>
          <Button onPress={ this.send } title={ "Send" }/>
        </View>
      </ScrollView>
    );
  }

  goBack = () => {
    const { goBack } = this.props.navigation
    goBack()
  }

  componentWillReceiveProps(nextProps) {
    const { notification } = this.props
    const nextNotification = nextProps.notification
    if(nextNotification && ((notification && notification.id != nextNotification.id) || notification == null)) {
      this.showAlert(nextNotification)
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
    user: state.appState.user,
    currentRoute: state.appState.currentRoute
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeConnection: (isConnected) => {
      dispatch(changeConnection(isConnected))
    },
    contactUs: (data) => {
      dispatch(contactUs(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsScene)
