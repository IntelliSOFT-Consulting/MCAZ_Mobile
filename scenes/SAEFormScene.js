import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import SectionAScene from './sae/SectionAScene'
import SectionBScene from './sae/SectionBScene'
import SectionCScene from './sae/SectionCScene'
import SectionDScene from './sae/SectionDScene'

import { connect } from 'react-redux'
import { REPORT_TYPE_SAE, SAE_URL } from '../utils/Constants'
import { SAE_MANDATORY_FIELS } from '../utils/FormFields'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

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
      model = { rid : Date.now(), type : REPORT_TYPE_SAE }
      if(followUp) {
        model.parent_id = ""
      }
    }
    //model = {"rid":1511180361456,"type":"REPORT_TYPE_SAE","mrcz_protocol_number":"nn","mcaz_protocol_number":"sds","name_of_institution":"sdsd","reporter_phone":"09023","principal_investigator":"x","reporter_name":"s","designation_id":"1","study_title":"s","date_of_adverse_event":"4-10-2017","institution_code":"s","reporter_email":"s","study_sponsor":"d","participant_number":"d","report_type":"Initial","date_of_birth":"3-10-2017","gender":"Male","date_of_site_awareness":"3-10-2017","study_week":"1","adverse_event_type":"AE","visit_number":"2","toxicity_grade":"Grade 1","previous_events":"No","total_saes":"2","location_event":"Home","research_involves":"Drug","name_of_drug":"s","drug_investigational":"Yes","adr_list_of_drugs":[{"drug_name":"s","dosage":"s","dose_id":"4","route_id":"2","frequency_id":"3","start_date":"3-10-2017","taking_drug":"No","relationship_to_sae":"Definitely related"}],"adr_other_drugs":[],"report_to_mcaz":"No","report_to_mrcz":"No","report_to_sponsor":"No","report_to_irb":"No","medical_history":"s","diagnosis":"s","immediate_cause":"s","symptoms":"s","investigations":"s","results":"s","management":"s","outcome":"s","d1_consent_form":"Unknown","d3_changes_sae":"Unknown","d2_brochure":"Unknown","d4_consent_sae":"Unknown","changes_explain":"s","assess_risk":"No","patient_other_drug":"No","mraz_protocol_number":"Vbbb"}
    //state.model = model
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
      followUp: followUp
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _updateRoute = index => this.setState({ index })

  _renderScene = SceneMap({
    '1' : () => <SectionAScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } followUp={ this.state.followUp }/>,
    '2' : () => <SectionBScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '3' : () => <SectionCScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '4' : () => <SectionDScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }
            saveAndSubmit={ this.saveAndSubmit } />,
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

  saveAndContinue() {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
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
          if(model[field.dependent] == field.value && (model[field.name] == null || model[field.name] === "")) {
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
    const { uploadData, saveCompleted, connection } = this.props
    if(connection.isConnected) {
      uploadData(model, SAE_URL)
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url) => { // Upload the data.
      dispatch(uploadData(data, url))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SAEScene)
