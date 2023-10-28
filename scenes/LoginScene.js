import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler, Image, Dimensions } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, login } from '../actions'
import { connect } from 'react-redux'
// import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'
import { validEmail } from '../utils/utils';

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
    const { email, password } = this.state;
    if (email === '') {
      Alert.alert('Error',"Fill in the email.");
    } else if (!validEmail(email)) {
      Alert.alert('Error',"Fill in a valid email address.");
    } else if (password === '') {
      Alert.alert('Error',"Fill in the password.");
    } else {
      if(this.props.user.username != null && this.state.email != this.props.user.username) {
        Alert.alert("Confirm", "Another user had logged in in this device, if you proceed it will wipe out all data, continue?", [
          { text: 'Yes', onPress: () => this.doLogin() },
          { text: 'No' }
        ])
      } else {
        this.doLogin()
      }
    }
  }

  doLogin = () => {
    const { login } = this.props
    var data = {}
    data.email = this.state.email
    data.password = this.state.password
    login(data)
  }

  signup = () => {
    const { navigate } = this.props.navigation;
    navigate("SignupScene")
  }

  resetPassword = () => {
    const { navigate } = this.props.navigation;
    navigate("ResetPasswordScene")
  }

  render() {
    var {height, width} = Dimensions.get('window')
    const completedCount = this.props.completed.length
    return (
      <ScrollView style={ AppStyles.scrollContainer } keyboardShouldPersistTaps={'handled'}>
        <Image source={ require("../images/mcaz_3.png") } resizeMode="contain" style={{ width : width - 20 }} />
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
        <TextField {...this.props}
          label="Email"
          autoCapitalize={'none'}
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
          <Text style={ AppStyles.subHeaderText }>Forgot password?</Text>
          <View style={ AppStyles.button }>
            <Button onPress={ this.resetPassword } title={ "Reset password" }/>
          </View>
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    const { token } = this.state
    if(token != null) {
      const { navigate } = this.props.navigation;
      /*const navigateAction = NavigationActions.navigate({
        routeName: 'Main',
        params: {},
        action: NavigationActions.navigate({ routeName: 'MainScene'})
      })
      this.props.navigation.dispatch(navigateAction)*/
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

  componentWillReceiveProps(nextProps) {
    const { token } = this.state
    const nextToken = nextProps.token
    // Login success, navigate to main page
    if(token == null && nextToken != null) {
      const { navigate } = this.props.navigation;
      this.setState({ token : nextToken })
      /*const resetAction = NavigationActions.reset({
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
      //navigate("Main")*/
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
