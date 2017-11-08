import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports } from '../actions'
import { connect } from 'react-redux'

class MainScene extends Component {
  static navigationOptions = {
    title: 'MCAZ - Home',
  }
  constructor(props, context) {
    super(props, context)
    this.showNewADRReport = this.showNewADRReport.bind(this)
    this.showNewSAEFormReport = this.showNewSAEFormReport.bind(this)
    this.showNewAEFIForm = this.showNewAEFIForm.bind(this)
    this.showNewAEFIReportingForm = this.showNewAEFIReportingForm.bind(this)
    this.showSaved = this.showSaved.bind(this)
    this.uploadReports = this.uploadReports.bind(this)
    this.changeConnection = this.changeConnection.bind(this)
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

  showNewAEFIReportingForm() {
    const { navigate } = this.props.navigation;
    navigate("AEFIReportingFormScene")
  }

  showSaved() {
    const { navigate } = this.props.navigation;
    navigate("SavedReports")
  }

  uploadReports() {
    const { uploadCompletedReports, completed, connection } = this.props
    if(!connection.isConnected) {
      Alert.alert("Warning", "You are currently offline.")
      return
    }
    if(completed.length == 0) {
      Alert.alert("Info", "No reports to upload.")
      return
    }
    uploadCompletedReports(completed)
  }

  render() {
    const completedCount = this.props.completed.length
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
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
          <View style={ AppStyles.button }>
            <Button onPress={ this.showNewAEFIReportingForm } title="New AEFI Reporting Form"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.showSaved } title="Saved reports"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.uploadReports } title={ "Upload completed reports (" + completedCount + ")" }/>
          </View>
        </View>
      </ScrollView>
    );
  }

  /**
    Listener for changes in connection status.
  */
  changeConnection(isConnected) {
    const { changeConnection } = this.props
    changeConnection({ isConnected : isConnected })
    console.log(isConnected)
  }

  /**
    When the component is mounted we set the listener for Connection status.
  */
  componentDidMount() {
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.changeConnection);
    });
  }

}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    completed : state.appState.completed
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene)
