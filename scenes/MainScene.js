import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, logout, fetchReport, setReport } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import RNFetchBlob from 'react-native-fetch-blob'

import SelectOneField from './components/SelectOneField'
import TextInputField from './components/TextInputField'
import { REPORT_TYPES } from '../utils/FieldOptions'
import { getURL } from '../utils/utils'

import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

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
    this.state = { modalVisible : false, openReportModal : false }
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

  downloadReports = () => {
    const { uploadCompletedReports, completed, connection, token } = this.props
    if(completed.length == 0) {
      Alert.alert("Info", "No reports to download.")
      return
    }
    var reports = {}
    reports.sadr = completed.filter(report => report.type == REPORT_TYPE_ADR)
    reports.adr = completed.filter(report => report.type == REPORT_TYPE_SAE)
    reports.aefi = completed.filter(report => report.type == REPORT_TYPE_AEFI)
    reports.saefi = completed.filter(report => report.type == REPORT_TYPE_AEFI_INV)

    const string = JSON.stringify(reports)

    const dirs = RNFetchBlob.fs.dirs
    const fs = RNFetchBlob.fs
    const name = new Date().toString().split(/ /).join('_') + '.json'
    fs.createFile(dirs.DownloadDir + '/' + name, string, 'utf8')
    Alert.alert("Info", "File " + name + " created.")
  }

  confirmLogout = () => {
    Alert.alert(
      'Logout?',
      'Confirm you want to logout',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: () => this.showLogin() },
      ],
      { cancelable: false }
    )
  }

  showLogin = () => {

    const { navigate } = this.props.navigation;
    const { logout } = this.props
    logout()
    //navigate("LoginScene")

    const navigateAction = NavigationActions.navigate({
      routeName: 'Auth',
      params: {},
      action: NavigationActions.navigate({ routeName: 'LoginScene'})
    })
    this.props.navigation.dispatch(navigateAction)
  }

  createReport = (followUp) => {
    this.setState({ modalVisible : false })
    const { navigate } = this.props.navigation;
    navigate(this.state.reportType, { followUp : followUp })
  }

  openReport = () => {
    this.setState({ openReportModal : true, searchModel : { type : "", reference_number : ""} })
  }

  cancelReport = () => {
    this.setState({ openReportModal : false, searchModel : { type : "", reference_number : ""} })
  }

  showReport = (visible) => {
    this.setState({ openReportModal : false} )

    const { uploaded } = this.props
    const report = uploaded.find((i) => i.reference_number == this.state.searchModel.reference_number)
    if(report) {
      this.displayReport(report)
    } else {
      const { fetchReport, token } = this.props
      fetchReport(btoa(this.state.searchModel.reference_number), getURL({ type : this.state.searchModel.type }),token)
    }
  }

  displayReport = (report) => {
    const { navigate } = this.props.navigation
    const model = { model : report }
    navigate('ReadOnlyReportScene', model)
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
            <Button onPress={ this.downloadReports } title={ "Download completed reports (" + completedCount + ")" }/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.openReport } title={ "Open Report" }/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ this.confirmLogout } title={ "Logout" }/>
          </View>
        </View>
        <Modal animationType = {"slide"} transparent = {true} presentationStyle={ "overFullScreen" }
          isVisible = { this.state.openReportModal }
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <View style = { AppStyles.modalContainer }>
            <SelectOneField name={ "type" } model={ this.state.searchModel } options={ REPORT_TYPES } label="Select type" required={ true }/>
            <TextInputField name="reference_number"  model={ this.state.searchModel } label="Reference number" required={ true }/>
            <View style={ AppStyles.button }>
              <Button onPress={ () => this.showReport(false) } title="Open report"/>
            </View>
            <Button onPress={ () => this.cancelReport(false) } title="Close"/>
          </View>
        </Modal>

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
    const { notification, viewReport } = this.props
    const nextNotification = nextProps.notification
    if(nextNotification && ((notification && notification.id != nextNotification.id) || notification == null)) {
      this.showAlert(nextNotification)
    }
    if(viewReport == null && nextProps.viewReport != null) {
      this.displayReport(nextProps.viewReport)
      const { setReport } = this.props
      setReport(null)
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      /**/
      const { screenProps } = this.props
      console.log(screenProps)
      const route = screenProps.routes[screenProps.index]
      const currentRoute = route.routes[route.index]
      if(currentRoute.routeName == this.props.navigation.state.routeName) {
        if(!this.state.modalVisible &&  !this.state.openReportModal) {
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

}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    completed : state.appState.completed,
    uploaded : state.appState.uploaded,
    notification: state.appState.notification,
    token: state.appState.token,
    viewReport: state.appState.viewReport
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
    logout: () => {
      dispatch(logout())
    },
    fetchReport: (id, url, token) => {
      dispatch(fetchReport(id, url, token))
    },
    setReport: (report) => {
      setReport(report)
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene)
