import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Toast, { DURATION } from 'react-native-easy-toast'

import AppStyles from '../styles/AppStyles'
import PatientDetails from './adr/PatientDetails'
import Medication from './adr/Medication'
import ReporterDetailsScene from './adr/ReporterDetailsScene'
import AdverseReactionScene from './adr/AdverseReactionScene'
import { connect } from 'react-redux'
import { REPORT_TYPE_ADR, ADR_URL } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import DeviceInfo from 'react-native-device-info';

class ADRScene extends PureComponent {
  static navigationOptions = {
    title: 'ADR Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Patient details' },
      { key: '2', title: 'Adverse reaction' },
      { key: '3', title: 'Medication' },
      { key: '4', title: 'Reported by' },
    ],
  };

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

    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_ADR, data_source: "phone", device_type : DeviceInfo.getSystemName(), reporter_email: user.email, reporter_name: user.name }
      if(followUp) {
        model.parent_id = ""
      }
    }

    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Patient details' },
        { key: '2', title: 'Adverse reaction' },
        { key: '3', title: 'Medication' },
        { key: '4', title: 'Reported by' },
      ],
      isConnected: connection.isConnected,
      validate: false,
      followUp: followUp
    }
    this.mandatory = [
      { name : "patient_name", text : "Patient Initials", page : 1 },
      { name : "date_of_birth", text: "Date of bith", page : 1,  dependent: "age", value: ""},
      { name : "age", text: "Age", page : 1,  dependent: "date_of_birth", value: ""},
      { name : "gender", text : "Sex", page : 1 },
      { name : "date_of_onset_of_reaction", text : "Date of onset", page : 2 },
      { name : 'description_of_reaction', text : "Description of ADR", page : 2},
      { name : "severity", text : "Serious", page : 2 }, { name : "outcome", text : "Outcome", page : 3 },
      { name : "sadr_list_of_drugs", fields: [{ name : "drug_name", text : "Generic name" }, { name : "dose_id", text : "Dose" },
        { name : "frequency_id", text : "Frequency" }, { name : "start_date", text : "Start date" }], page: 3},
      { name : 'action_taken', text : "Action taken", page : 3 },
      { name : "reporter_name", text : "Forename & Surname", page : 4 },
      { name : "designation_id", text : "Designation", page : 4 }, { name : "reporter_email", text : "Email Address", page : 4 }]
  }

  _handleIndexChange = index => this.setState({ index });

  _updateRoute = index => this.setState({ index })

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _renderScene = SceneMap({
    '1' : () => <PatientDetails model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } followUp={ this.state.followUp }/>,
    '2' : () => <AdverseReactionScene saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } model={ this.state.model }/>,
    '3' : () => <Medication model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '4' : () => <ReporterDetailsScene model={ this.state.model } user={ this.state.model.user } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } saveAndSubmit={ this.saveAndSubmit }
      validate={ this.state.validate } />,
  });

  render() {
    return (
      <TabViewAnimated
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        changeRoute={this._updateRoute.bind(this)}

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
    this.mandatory.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          var suspected_drug = 0
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
            if(val['suspected_drug'] == '1') {
              suspected_drug++
            }
          }
          if(suspected_drug == 0) {
            names += "\nCheck at least one suspected drug"
          }
        } else {
          valid = false
          names += "\nAdd at least one suspected drug."
        }
        if(names != "" && arrayNames.length > 0) {
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
    if(page == null) {
      page = 2
    }
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
    var { model } = this.state
    model.submitted = 2
    const { uploadData, saveCompleted, connection, token } = this.props
    if(connection.isConnected) {
      uploadData(model, ADR_URL, token)
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
    token: state.appState.user.token,
    user: state.appState.user
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

export default connect(mapStateToProps, mapDispatchToProps)(ADRScene)
