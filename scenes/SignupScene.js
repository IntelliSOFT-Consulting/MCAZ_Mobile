import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, signUp } from '../actions'
import { connect } from 'react-redux'

import { TextField } from 'react-native-material-textfield'

class SignupScene extends Component {
  static navigationOptions = {
    title: 'MCAZ - Signup',
  }
  constructor(props, context) {
    super(props, context)
    this.state = { email : "", password: "", confirmPassword: ""}
  }

  handleChange = (name, value) => {
    var state = {}
    state[name] = value
    this.setState(state)
  }

  signup = () => {
    if(this.state.email != "" && this.state.password != '' && this.state.confirmPassword != '') {
      const { signUp } = this.props
      var data = {}
      data.email = this.state.email
      data.password = this.state.password
      data.confirm_password = this.state.confirmPassword
      data.is_active = true
      signUp(data)
    } else {
      this.setState({ validate: true })
    }
  }

  login = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }

  render() {
    const completedCount = this.props.completed.length
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
        <TextField {...this.props}
          label="Email"
          value={ this.state.email }
          onChangeText={ (text) => this.handleChange("email", text) }
        />
        <TextField {...this.props}
          label="Password"
          value={ this.state.password }
          onChangeText={ (text) => this.handleChange("password", text) }
        />
        <TextField {...this.props}
          label="Confirm Password"
          value={ this.state.confirmPassword }
          onChangeText={ (text) => this.handleChange("confirmPassword", text) }
        />
        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button onPress={ this.signup } title={ "Signup" }/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.login } title={ "Back to login" }/>
          </View>
        </View>
      </ScrollView>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.props
    const nextToken = nextProps.token
    // Signup success, navigate to main page
    if(token == null && nextToken != null) {

    }
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    completed : state.appState.completed,
    notification: state.appState.notification,
    token: state.appState.token
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
    signUp: data => {
      dispatch(signUp(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScene)
