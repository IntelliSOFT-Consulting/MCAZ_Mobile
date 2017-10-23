import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView } from 'react-native';
import AppStyles from '../styles/AppStyles'

export default class MainScene extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  constructor(props, context) {
    super(props, context)
    this.showNewADRReport = this.showNewADRReport.bind(this)
    this.showNewSAEFormReport = this.showNewSAEFormReport.bind(this)
    this.showNewAEFIForm = this.showNewAEFIForm.bind(this)
  }

  showNewADRReport() {
    const { navigate } = this.props.navigation;
    navigate("ADRScene")
  }

  showNewSAEFormReport() {
    const { navigate } = this.props.navigation;
    navigate("SAEFormScene")
  }

  showNewAEFIForm() {
    const { navigate } = this.props.navigation;
    navigate("AEFIInvFormScene")
  }

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>PV</Text>
        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button  onPress={ this.showNewADRReport } title="New ADR Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.showNewSAEFormReport } title="New SAE Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.showNewAEFIForm } title="New AEFI Investigation Form"/>
          </View>
        </View>
      </ScrollView>
    );
  }
}
