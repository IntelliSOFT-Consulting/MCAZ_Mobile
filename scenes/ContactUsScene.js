import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, contactUs, login } from '../actions'
import { connect } from 'react-redux'
import { TextField } from 'react-native-material-textfield'
import { validEmail } from '../utils/utils';

class ContactUsScene extends Component {
  /*static navigationOptions = ({ navigation }) => {
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
  }*/
  constructor(props, context) {
    super(props, context)
    const { token } = this.props
    this.state = { email : "", feedback: "", subject: "", token : token }
  }

  handleChange = (name, value) => {
    var state = {}
    state[name] = value
    this.setState(state)
  }

  resetState = () => {
    this.setState({ email : "", feedback: "", subject: ""})
  }

  send = () => {
    if(this.state.email != '' && this.state.message != '') {
      this.sendMessage()
    } else {
      this.showAlert({ title : "error", message : "Enter email and feedback message."})
    }
  }

  sendMessage = () => {
    const { contactUs } = this.props
    const { email, feedback } = this.state;
    var data = {}
    if (!validEmail(email)) {
      Alert.alert("", "Email not valid.");
      return;
    } else if (feedback.length < 10) {
      Alert.alert("", "Message is too short.");
      return;
    }
    data.email = email
    data.subject = this.state.subject
    data.feedback = feedback
    contactUs(data)
    this.resetState()

    const { goBack } = this.props.navigation
    goBack(null)
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
        <TextField {...this.props}
          label="Subject" returnKeyType='next'
          value={ this.state.subject }
          onChangeText={ (text) => this.handleChange("subject", text) }
        />
        <TextField
          label="Feedback"
          returnKeyType='next'
          multiline={true}
          value={ this.state.message }
          onChangeText={ (text) => this.handleChange("feedback", text) }
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
    goBack(null)
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
    connection: state.connection,
    completed : state.completed,
    notification: state.notification,
    token: state.user.token,
    user: state.user,
    currentRoute: state.currentRoute
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
