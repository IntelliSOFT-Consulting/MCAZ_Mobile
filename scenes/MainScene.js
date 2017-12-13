import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports } from '../actions'
import { connect } from 'react-redux'

import Modal from 'react-native-modal';

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
    this.showAlert = this.showAlert.bind(this)
    this.state = { modalVisible : false }
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

  selectReportType = (visible, type) => {
    this.setState({ modalVisible : visible, reportType : type })
  }

  uploadReports() {
    const { uploadCompletedReports, completed, connection, token } = this.props
    if(!connection.isConnected) {
      Alert.alert("Warning", "You are currently offline.")
      return
    }
    if(completed.length == 0) {
      Alert.alert("Info", "No reports to upload.")
      return
    }
    uploadCompletedReports(completed, token)
  }

  showLogin = () => {
    const { navigate } = this.props.navigation;
    navigate("LoginScene")
  }

  createReport = (followUp) => {
    this.setState({ modalVisible : false })
    const { navigate } = this.props.navigation;
    navigate(this.state.reportType, { followUp : followUp })
  }

  render() {
    const completedCount = this.props.completed.length
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button  onPress={ () => this.selectReportType(true, "ADRScene") } title="New ADR Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.selectReportType(true, "SAEFormScene") } title="New SAE Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.selectReportType(true, "AEFIReportingFormScene") } title="New AEFI Reporting Form"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.selectReportType(true, "AEFIInvFormScene") } title="New AEFI Investigation Form"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.showSaved } title="Saved reports"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.uploadReports } title={ "Upload completed reports (" + completedCount + ")" }/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.showLogin } title={ "Logout" }/>
          </View>
        </View>
        <Modal animationType = {"slide"} transparent = {true} presentationStyle={ "overFullScreen" }
          isVisible = { this.state.modalVisible }
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <View style = { AppStyles.modalContainer }>
            <View style={ AppStyles.button }>
              <Button onPress={ () => this.createReport(false) } title="New report"/>
            </View>
            <View style={ AppStyles.button }>
              <Button onPress={ () => this.createReport(true) } title="Follow up report"/>
            </View>

            <Button onPress={ () => this.selectReportType(false) } title="Close"/>
          </View>
        </Modal>
      </ScrollView>
    );
  }

  /**
    Listener for changes in connection status.
  */
  changeConnection(isConnected) {
    const { changeConnection } = this.props
    changeConnection({ isConnected : isConnected })
  }

  /**
    When the component is mounted we set the listener for Connection status.
  */
  componentDidMount() {
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.changeConnection);
    });
  }

  showAlert(notification) {
    Alert.alert("info", notification.message)
  }

  componentWillReceiveProps(nextProps) {
    const { notification } = this.props
    const nextNotification = nextProps.notification
    if(nextNotification && ((notification && notification.id != nextNotification.id) || notification == null)) {
      this.showAlert(nextNotification)
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
    uploadCompletedReports: (reports, token) => {
      dispatch(uploadCompletedReports(reports, token))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene)
