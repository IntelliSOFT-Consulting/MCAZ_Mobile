import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, login } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'

class LoginScene extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  constructor(props, context) {
    super(props, context)
    const { token } = this.props
    this.state = { "email" : "", password: "", token : token }

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
          label="Email/Username"
          value={ this.state.email } keyboardType="email-address"
          onChangeText={ (text) => this.handleChange("email", text) }
        />
        <TextField {...this.props}
          label="Password"
          value={ this.state.password } secureTextEntry={ true }
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
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.state
    const nextToken = nextProps.token
    // Login success, navigate to main page
    if(token == null && nextToken != null) {
      const { navigate } = this.props.navigation;
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainScene'})
        ]
      })

      const navigateAction = NavigationActions.navigate({
        routeName: 'Main',
        params: {},
        action: NavigationActions.navigate({ routeName: 'MainScene'})
      })
      this.props.navigation.dispatch(navigateAction)
      //navigate("Main")
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
