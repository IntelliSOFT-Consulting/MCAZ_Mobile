import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, ScrollView, NetInfo, BackHandler, TouchableOpacity, Image, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, logout, fetchReport, setReport, fetchNews, removeCompletedReports, archiveData } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
var RNFS = require('react-native-fs');

import SelectOneField from './components/SelectOneField'
import TextInputField from './components/TextInputField'
import { REPORT_TYPES } from '../utils/FieldOptions'
import { getURL, pad } from '../utils/utils'

import base64 from 'base-64'

import X2JS from 'x2js'

import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

import Modal from 'react-native-modal';

class MainScene extends Component {
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: 'MCAZ - Home',
      headerRight: (
        <TouchableOpacity onPress={ () => navigation.state.params.logout() } >
          <Image source={ require("../images/ic_power_settings_new_black_36dp_1x.png") }/>
        </TouchableOpacity>
      )
    }
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
    if(completed.length == 0) {
      Alert.alert("Info", "No reports to upload.")
      return
    }
    if(!connection.isConnected) {
      Alert.alert("Warning", "You are currently offline.")
      return
    }
    uploadCompletedReports(completed, token)
  }

  downloadReports = () => {
    const { removeCompletedReports, completed, connection, token, archiveData } = this.props
    if(completed.length == 0) {
      Alert.alert("Info", "No reports to download.")
      return
    }
    var reports = {}
    reports.sadr = completed.filter(report => report.type == REPORT_TYPE_ADR)
    reports.adr = completed.filter(report => report.type == REPORT_TYPE_SAE)
    reports.aefi = completed.filter(report => report.type == REPORT_TYPE_AEFI)
    reports.saefi = completed.filter(report => report.type == REPORT_TYPE_AEFI_INV)

    var xmls = []

    const files = this.saveFiles(completed)
    archiveData(completed)
    removeCompletedReports()
    // Alert.alert("Info", "File(s)\n" + files.join("\n") + " created.")
  }

  downloadArchived = () => {
    const { archived } = this.props
    const arch = archived.filter( i => i != null )
    if(arch.length == 0) {
      Alert.alert("Info", "No reports to download.")
      return
    }
    const files = this.saveFiles(arch)
  }

  saveFiles = async (completed) => {
    let path = RNFS.DocumentDirectoryPath;
    if(Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      path = RNFS.DownloadDirectoryPath;
    }
    var x2js = new X2JS()
    // const dirs = RNFetchBlob.fs.dirs
    // const fs = RNFetchBlob.fs
    const date = new Date()
    const name = date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds()) + ".xml"// new Date().toString().split(/ /).join('_') + '.xml'

    var sadrs = completed.filter(report => report.type == REPORT_TYPE_ADR);
    var files = []
    if(sadrs.length > 0) {
      var output = { response : {}}
      output.response.sadrs = sadrs
      const string = x2js.json2xml_str(output) //xmls.join("")
      console.log(RNFS.DownloadDirectoryPath)
      RNFS.writeFile(path + '/sadrs_' + name, string, 'utf8').then((success) => {
        console.log('SADR FILE WRITTEN!');
        files.push('saefis_' + name)
      }).catch((err) => {
        console.log(err.message);
      });
      files.push('sadrs_' + name)
    }
    var adrs = completed.filter(report => report.type == REPORT_TYPE_SAE)
    if(adrs.length > 0) {
      var output = { response : {}}
      output.response.adrs = adrs
      const string = x2js.json2xml_str(output) //xmls.join("")
      RNFS.writeFile(path + '/adrs_' + name, string, 'utf8').then((success) => {
        console.log('ADR FILE WRITTEN!');
        files.push('saefis_' + name)
      })
      .catch((err) => {
        console.log(err.message);
      });
      files.push('adrs_' + name)
    }

    var aefis = completed.filter(report => report.type == REPORT_TYPE_AEFI)
    if(aefis.length > 0) {
      var output = { response : {}}
      output.response.aefis = aefis
      const string = x2js.json2xml_str(output) //xmls.join("")
      RNFS.writeFile(path + '/aefis_' + name, string, 'utf8')
      files.push('aefis_' + name).then((success) => {
        console.log('AEFIS FILE WRITTEN!');
        files.push('saefis_' + name)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }

    var saefis = completed.filter(report => report.type == REPORT_TYPE_AEFI_INV)
    if(saefis.length > 0) {
      var output = { response : {}}
      output.response.saefis = saefis
      const string = x2js.json2xml_str(output) //xmls.join("")
      RNFS.writeFile(path + '/saefis_' + name, string, 'utf8').then((success) => {
        console.log('SAEFI FILE WRITTEN!');
        files.push('saefis_' + name)
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    }
    Alert.alert("Info", "File(s)\n" + files.join("\n") + " created.")
    return files
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

  createReport = (screen) => {
    this.setState({ modalVisible : false })
    const { navigate } = this.props.navigation;
    navigate(screen)
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
    console.log(base64.encode(this.state.searchModel.reference_number))
    if(report) {
      this.displayReport(report)
    } else {
      const { fetchReport, token } = this.props
      fetchReport(base64.encode(this.state.searchModel.reference_number), getURL({ type : this.state.searchModel.type }),token)
    }
  }

  displayReport = (report) => {
    const { navigate } = this.props.navigation
    const model = { model : report }
    navigate('ReadOnlyReportScene', model)
  }

  render() {
    var {height, width} = Dimensions.get('window')
    const completedCount = this.props.completed.length
    const archivedCount = this.props.archived.filter( i => i != null ).length
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Image source={ require("../images/mcaz_3.png") } resizeMode="contain" style={{  width : width - 20 }} />
        <Text style={ AppStyles.subHeaderText }>SAE, ADR and AEFI electronic reporting.</Text>
        <View style={ AppStyles.columnButtons }>
          <View style={ AppStyles.button }>
            <Button  onPress={ () => this.createReport("ADRScene") } title="New ADR Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.createReport("SAEFormScene") } title="New SAE Report"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.createReport("AEFIReportingFormScene") } title="New AEFI Reporting Form"/>
          </View>
          <View style={ AppStyles.button }>
            <Button onPress={ () => this.createReport("AEFIInvFormScene") } title="New AEFI Investigation Form"/>
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
            <Button onPress={ this.downloadArchived } title={ "Archived (" + archivedCount + ")" }/>
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
      NetInfo.isConnected.addEventListener('change', this.changeConnection);
    });
    /*NetInfo.isConnected.addEventListener('change', this.changeConnection);
    NetInfo.isConnected.fetch().then().done((isConnected) => {
      NetInfo.isConnected.addEventListener('change', this.changeConnection);
      this.changeConnection(isConnected);
    }) /*() => {
      //NetInfo.isConnected.addEventListener('connectionChange', this.changeConnection);
    });*/

    const { fetchNews } = this.props
    fetchNews()
  }

  showAlert(notification) {
    Alert.alert("info", notification.message)
  }

  componentWillReceiveProps(nextProps) {
    const { notification, viewReport } = this.props
    const nextNotification = nextProps.notification
    if(viewReport == null && nextProps.viewReport != null) {
      this.displayReport(nextProps.viewReport)
      const { setReport } = this.props
      setReport(null)
    }
  }

  componentDidMount() {
    const { fetchNews } = this.props
    fetchNews()
    this.props.navigation.setParams({ logout : this.confirmLogout })
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      /**/
      const { currentRoute } = this.props

      if(currentRoute != null) {
        if(currentRoute.name == this.props.navigation.state.routeName) {
          if(!this.state.modalVisible &&  !this.state.openReportModal) {
            this.exitApp()
          }
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
    token: state.appState.user.token,
    viewReport: state.appState.viewReport,
    currentRoute: state.appState.currentRoute,
    archived : state.appState.archived,

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
    fetchNews: () => {
      dispatch(fetchNews())
    },
    archiveData: (data) => {
      dispatch(archiveData(data))
    },
    removeCompletedReports: () => {
      dispatch(removeCompletedReports())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScene)
