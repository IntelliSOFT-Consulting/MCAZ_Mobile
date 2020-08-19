import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
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

    var { model, connection, user } = this.props

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
    let cancelType = 'Close';
    if(model == null) {
      cancelType = 'Cancel';
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI, data_source: "phone", device_type : DeviceInfo.getSystemName(), reporter_email: user.email, reporter_name: user.name }
      if(followUp) {
        model.parent_id = ""
      }
    }
    //model = {"rid":1513837542360,"type":"REPORT_TYPE_AEFI","data_source":"phone","device_type":"Android","reports":[{}],"patient_name":"John","patient_surname":"Mwangi","gender":"Male","date_of_birth":"","age_at_onset":"","age_at_onset_days":"","age_at_onset_months":"5","age_at_onset_years":"5","age_at_onset_specify":"","designation_id":"14","reporter_institution":"Insti","province_id":"2","reporter_phone":"072223665","reporter_email":"john@kie.com","name_of_vaccination_center":"Aruru","aefi_list_of_vaccines":[{"vaccine_name":"Polio","vaccination_date":"19-11-2017 9:22","vaccination_time":" 12:30","dosage":"1","batch_number":"Gh","expiry_date":"20-11-2017","diluent_expiry_date":"20-11-2017","diluent_date":"20-11-2017 2:22"}],"ae_seizures":"1","adverse_events":"ae_seizures,ae_3days,ae_anaphylaxis","ae_3days":"1","ae_anaphylaxis":"1","aefi_date":"21-11-2017 12:30","patient_hospitalization":"No","notification_date":"21-11-2017","description_of_reaction":"Nausea","treatment_provided":"No","serious":"No","past_medical_history":"No hudtiry","district_receive_date":"21-11-2017","investigation_needed":"No","national_receive_date":"21-11-2017","comments":"Bsd neww ","reporter_address":"Kilifi","patient_address":"Higher","reporter_name":"M","outcome":"Died"}
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
      followUp: followUp,
      cancelType
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled tabStyle={AppStyles.tabStyle} style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

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
      <TabView
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }

  saveAndContinue(next) {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
    this.setState({ cancelType: 'Close' });
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
          if((model[field.dependent] == field.value || (field.value == "" && model[field.dependent] == null)) && (model[field.name] == null || model[field.name] === "")) {
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
    let message = '';
    if (this.state.cancelType === 'Close') {
      message = 'You can always open this version from draft to complete it, close this form?';
    } else {
      message = "Stop data entry, all changes would be lost. Close?";
    }
    Alert.alert("Confirm", message, [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
  }

  goBack() {
    const { goBack } = this.props.navigation;
    goBack()
  }

  upload() {
    var { model } = this.state
    model.submitted = 2
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
    connection: state.connection,
    token: state.user.token,
    user: state.user
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
