import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert } from 'react-native';
import AppStyles from '../styles/AppStyles'

export default class MainScene extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  constructor(props, context) {
    super(props, context)
    this.showNewADRReport = this.showNewADRReport.bind(this)
  }

  showNewADRReport() {
    const { navigate } = this.props.navigation;
    navigate("ADRScene")
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>PV</Text>
        <Button onPress={ this.showNewADRReport } title="New Report"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
