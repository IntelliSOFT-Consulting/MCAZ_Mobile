import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import SectionAScene from './sae/SectionAScene'
import SectionBScene from './sae/SectionBScene'
import SectionCScene from './sae/SectionCScene'
import SectionDScene from './sae/SectionDScene'

import { connect } from 'react-redux'
import { REPORT_TYPE_SAE, SAE_URL } from '../utils/Constants'
import { SAE_MANDATORY_FIELS } from '../utils/FormFields'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import DeviceInfo from 'react-native-device-info';
import { getURL } from '../utils/utils';

class SAEScene extends PureComponent {
  static navigationOptions = {
    title: 'SAE Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Section A' },
      { key: '2', title: 'Section B' },
      { key: '3', title: 'Section C' },
      { key: '4', title: 'Section D' }
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

    const { route } = this.props;
    if(route.params && route.params.model) {
      model = route.params.model
    }
    var followUp = null
    if(route.params && route.params.followUp) {
      followUp = route.params.followUp
    } else if(model && model.parent_id != null) { // if the model has the parent_id field, this must be a followUp form
      followUp = true
    }
    let cancelType = 'Close';
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_SAE, data_source: "phone", device_type : DeviceInfo.getSystemName(),reporter_email: user.email, reporter_name: user.name }
      cancelType = 'Cancel';
      if(followUp) {
        model.parent_id = ""
      }
    }
    //model = {"rid":1513840213875,"type":"REPORT_TYPE_SAE","data_source":"phone","device_type":"Android","mrcz_protocol_number":"Tyh","mcaz_protocol_number":"124","name_of_institution":"Retur","principal_investigator":"Kamau","reporter_phone":"072233655","reporter_email":"joh.k.h@gmail.com","reporter_name":"John","designation_id":"5","study_title":"Titke ","study_sponsor":"KNH","date_of_adverse_event":"18-11-2017","date_of_site_awareness":"20-11-2017","institution_code":"Tested","participant_number":"Ret","date_of_birth":"15-11-2008","gender":"Male","report_type":"Follow-up","study_week":"3","visit_number":"4","adverse_event_type":"AE","toxicity_grade":"Grade 2","previous_events":"No","total_saes":"2","location_event":"Home","research_involves":"Drug","name_of_drug":"Panadol","drug_investigational":"No","adr_list_of_drugs":[{"drug_name":"Rex","dosage":"1","dose_id":"2","route_id":"2","frequency_id":"2","start_date":"20-11-2017","taking_drug":"No","relationship_to_sae":"Definitely related"}],"patient_other_drug":"No","adr_other_drugs":[{"drug_name":"Re","start_date":"20-11-2017","stop_date":"20-11-2017","relationship_to_sae":"Definitely related"}],"report_to_mcaz":"No","report_to_mcrz":"Yes","report_to_sponsor":"No","report_to_irb":"No","medical_history":"This is a description","diagnosis":"Fill","immediate_cause":"Caused","symptoms":"Symptoms","investigations":"Labs","adr_lab_tests":[{"lab_test":"Th","abnormal_result":"Hj","site_normal_range":"Hj","collection_date":"20-11-2017","lab_value":"Tty","lab_value_date":"20-11-2017"}],"results":"This","management":"Management","outcome":"Outcone","d1_consent_form":"No","d2_brochure":"N/A","d3_changes_sae":"N/A","d4_consent_sae":"Yes","changes_explain":"No chance","assess_risk":"Yes"}

    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Section A' },
        { key: '2', title: 'Section B' },
        { key: '3', title: 'Section C' },
        { key: '4', title: 'Section D' }
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
    '1' : () => <SectionAScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } followUp={ this.state.followUp } handleModelChange={this.handleModelChange} />,
    '2' : () => <SectionBScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } handleModelChange={this.handleModelChange} />,
    '3' : () => <SectionCScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } handleModelChange={this.handleModelChange}  />,
    '4' : () => <SectionDScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }
            saveAndSubmit={ this.saveAndSubmit } handleModelChange={this.handleModelChange} />,
  });

  handleModelChange = (change) => {
    const { model } = this.state;
    const newModel = Object.assign({}, model, change);
    this.setState({ model: newModel });
  }

  render() {
    return (
      <TabView
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        // renderTabBar={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }

  saveAndContinue(next) {
    const { saveDraft } = this.props
    const { model } = this.state
    this.setState({ cancelType: 'Close' });
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
    SAE_MANDATORY_FIELS.forEach((field) => {
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
          if((model[field.dependent] == field.value || (field.value1 && model[field.dependent] == field.value1)) && (model[field.name] == null || model[field.name] === "")) {
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
      uploadData(model, getURL({...model, submitted: 2 }), token)
    } else {
      Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted({...model, submitted: 2 })
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

export default connect(mapStateToProps, mapDispatchToProps)(SAEScene)
