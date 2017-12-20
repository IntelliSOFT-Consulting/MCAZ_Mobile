import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientReporterDetailsScene from './aefi-report/PatientReporterDetailsScene'
import AdverseEventsScene from './aefi-report/AdverseEventsScene'
import ReportDetailsScene from './aefi-report/ReportDetailsScene'
import VaccinationScene from './aefi-report/VaccinationScene'

import { connect } from 'react-redux'
import { REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'
import { AEFI_MANDATORY_FIELS } from '../utils/FormFields'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import DeviceInfo from 'react-native-device-info';

class AEFIReportingFormScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Report form',
  }

  constructor(props, context) {
    super(props, context)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)
    this.upload = this.upload.bind(this)

    var { model, connection } = this.props

    const { navigation } = this.props;
    if(navigation.state.params && navigation.state.params.model) {
      model = navigation.state.params.model
    }
    var followUp = null
    if(navigation.state.params && navigation.state.params.followUp) {
      followUp = navigation.state.params.followUp
    } else if(model && model.parent_id != null) { // if the model has the parent_id field, this must be a followUp form
      followUp = true
    }

    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI, data_source: "phone", device_type : DeviceInfo.getSystemName() }
      if(followUp) {
        model.parent_id = ""
      }
    }
    //model = {"rid":1512708932987,"type":"REPORT_TYPE_AEFI","ae_abscess":"1","adverse_events":"ae_abscess,ae-thrombocytopenia,ae-fever","ae-thrombocytopenia":"1","ae-fever":"1","patient_name":"Wenger","patient_next_of_kin":"Arsene","patient_address":"x","date_of_birth":"--2012","reporter_name":"sdsd","designation_id":"2","name_of_vaccination_center":"hhh","serious":"No","outcome":"Not yet recovered"}
    if(model.reports == null) {
      model.reports = [{}]
    }
    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Patient/Reporter details' },
        { key: '2', title: 'Vaccination' },
        { key: '3', title: 'Adverse events' },
        { key: '4', title: 'Report details' },
      ],
      isConnected: connection.isConnected,
      validate: false,
      followUp: followUp
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _updateRoute = index => this.setState({ index })

  _renderScene = SceneMap({
    '1' : () => <PatientReporterDetailsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } followUp={ this.state.followUp }/>,
    '2' : () => <VaccinationScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '3' : () => <AdverseEventsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '4' : () => <ReportDetailsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }
            saveAndSubmit={ this.saveAndSubmit } />
  });

  render() {
    return (
      <TabViewAnimated
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }

  saveAndContinue(next) {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
    if(next) {
      this._updateRoute(next - 1)
    }
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit() {
    const { model } = this.state
    const { uploadData, saveCompleted, connection } = this.props
    var valid = true
    var names = ""
    var page = 0
    AEFI_MANDATORY_FIELS.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          for(let i = 0; i < values.length; i++) {
            const val = values[i]
            fields.forEach((f) => {
              if(val[f.name] == null || val[f.name] === "") {
                valid = false
                if(page == 0) {
                  page = field.page
                }
                if(arrayNames.indexOf(f.text) == -1) {
                  arrayNames.push(f.text)
                }
              }
            })
          }
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(field.dependent) {
          if((model[field.dependent] == field.value || (field.value == "" && model[field.name] == null)) && (model[field.name] == null || model[field.name] === "")) {
            valid = false
            if(names != "") {
              names += ",\n "
            } else {
              page = field.page
            }
            names += field.text
          }
        } else if(model[field.name] == null || model[field.name] === "") {
          valid = false
          if(names != "") {
            names += ",\n "
          } else {
            page = field.page
          }
          names += field.text
        }
      }
    })
    if(!valid) {
      Alert.alert("Warning", "Fill in required fields\n " + names)
      this.setState({ validate : true })
      this._updateRoute(page - 1)
      return
    }

    Alert.alert("Confirm", "Submit data to MCAZ?", [
      {text: 'Yes', onPress: () => this.upload() },
      {text: 'No' }
    ])
  }

  cancel() {
    Alert.alert("Confirm", "Stop data entry?", [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
  }

  goBack() {
    const { goBack } = this.props.navigation;
    goBack()
  }

  upload() {
    const { model } = this.state
    const { uploadData, saveCompleted, connection, token } = this.props
    if(connection.isConnected) {
      uploadData(model, AEFI_URL, token)
    } else {
      Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(model)
    }
    this.goBack()
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    token: state.appState.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url, token) => { // Upload the data.
      dispatch(uploadData(data, url, token))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportingFormScene)
