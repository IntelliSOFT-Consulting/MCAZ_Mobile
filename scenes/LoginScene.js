import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, login } from '../actions'
import { connect } from 'react-redux'

import { TextField } from 'react-native-material-textfield'

class LoginScene extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  constructor(props, context) {
    super(props, context)
    this.state = { "email" : "", password: "" }
  }

  showSaved() {
    const { navigate } = this.props.navigation;
    navigate("SavedReports")
  }

  handleChange = (name, value) => {
    var state = {}
    state[name] = value
    this.setState(state)
  }

  login = () => {
    if(this.state.email != '' && this.state.password != '') {
      const { login } = this.props
      var data = {}
      data.username = this.state.email
      data.password = this.state.password
      login(data)
    } else {
      this.setState({ validate: true })
    }
  }

  signup = () => {
    const { navigate } = this.props.navigation;
    navigate("SignupScene")
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
        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button onPress={ this.login } title={ "Login" }/>
          </View>
          <Text style={ AppStyles.subHeaderText }>No account?</Text>
          <View style={ AppStyles.button }>
            <Button onPress={ this.signup } title={ "Signup" }/>
          </View>
        </View>
      </ScrollView>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.props
    const nextToken = nextProps.token
    // Login success, navigate to main page
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
    login: data => {
      dispatch(login(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene)
