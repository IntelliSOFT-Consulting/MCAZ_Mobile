import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, Button } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Toast, { DURATION } from 'react-native-easy-toast'

import AppStyles from '../styles/AppStyles'
import ReadOnlyDataRenderer from './components/ReadOnlyDataRenderer'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import DateTimeInput from './components/DateTimeInput'
import DateSelectInput from './components/DateSelectInput'
import MedicationTableComponent from "./components/MedicationTableComponent"
import FileAttachmentComponent from "./components/FileAttachmentComponent"

import { connect } from 'react-redux'
import { REPORT_TYPE_SAE, SAE_URL } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import { SEVERITY_REASON, BOOLEAN_OPTIONS } from '../utils/FieldOptions'

import DeviceInfo from 'react-native-device-info';

class SAEFollowupScene extends PureComponent {
  static navigationOptions = {
    title: 'SAE Follow up',
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
    let cancelType = 'Close';
    if(model == null) {
      cancelType = 'Cancel';
      model = { rid : Date.now(), type : REPORT_TYPE_SAE, data_source: "phone", device_type : DeviceInfo.getSystemName() }
    }
    //model = {"rid":Date.now(),"type":"REPORT_TYPE_ADR_FOLLOW_UP","parent_reference":"ADR1/2017","report_type":"FollowUp","date_of_onset_of_reaction":"01-11-2017","severity":"No","description_of_reaction":"Gh","sadr_list_of_drugs":[{"drug_name":"S","brand_name":"G","dose_id":"2","route_id":"2","frequency_id":"2","start_date":"01-11-2017","stop_date":"01-11-2017","suspected_drug":"1"}]}
    //model = {"rid":1512503271856,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"2","route_id":"4","frequency_id":"3","start_date":"14-10-2017","stop_date":"4-11-2017","indication":"1","suspected_drug":"1"}],"action_taken":"Drug withdrawn","outcome":"Recovered","relatedness":"Certain","designation_id":"1","reporter_name":"John Muiruri","reporter_email":"jihn@ggh.con","reporter_phone":"07555555","date_of_onset_of_reaction":"22-10-2017","date_of_end_of_reaction":"1-11-2017","severity":"No","severity_reason":"Death","institution_code":"Ggg","patient_name":"Jm","ip_no":"Ggh","date_of_birth":"13-11-1990","age_group":"child","weight":"23","height":"123","gender":"Male","medical_history":"Hone","past_drug_therapy":"Kit","lab_test_results":"Limr","description_of_reaction":"This i"}
    //model = {"rid":1510853208716,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"7","route_id":"4","frequency_id":"4","drug_name":"wwqq","dose":"1","indication":"1","start_date":"1-10-2017","stop_date":"21-10-2017","suspected_drug":""}],"user":{},"patient_name":"xxsss","date_of_birth":"6-4-2015","weight":"34","height":"12","gender":"Male","date_of_onset_of_reaction":"8-2-2017","severity":"No","medical_history":"ss","lab_test_results":"ssds","action_taken":"Dose reduced","outcome":"Recovering","":"Probable / Likely","designation_id":"2","reporter_name":"John","reporter_email":"john@gmail.com","description_of_reaction":"hhhn"}
    //state.model = model
    this.state = {
      model: model,
      isConnected: connection.isConnected,
      validate: false,
      cancelType
    }
    this.mandatory = [
      { name : "date_of_onset_of_reaction", text : "Date of onset", page : 2 },
      { name : 'description_of_reaction', text : "Description of ADR", page : 2},
      { name : "severity", text : "Serious", page : 2 },
      { name : "sadr_list_of_drugs", fields: [{ name : "drug_name", text : "Generic name" }, { name : "dose_id", text : "Dose" },
        { name : "frequency_id", text : "Frequency" }, { name : "start_date", text : "Start date" }]}, // , { name : "suspected_drug", text : "Tick suspected medicine" }
    ]
  }

  render() {
    const { model } = this.state
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  }>
        <ReadOnlyDataRenderer name="parent_reference" model={ model } />
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <DateSelectInput model={ model } name="date_of_onset_of_reaction" label="Date of onset" required={ true } onChange={ this.onChange } maxDate={ new Date() }/>
        <DateSelectInput model={ model } name="date_of_end_of_reaction" label="Date of end of reaction (If ended)" maxDate={ new Date() } minDate={ this.state.date_of_onset_of_reaction }/>

        <TextInputField model={ model } name="description_of_reaction" label="Description of ADR" multiline = {true}
         numberOfLines = {4} required={ true }/>
        <SelectOneField model={ model } name="severity" label="Serious " required={ true } options={ BOOLEAN_OPTIONS }/>
        <SelectOneField model={ model } name="severity_reason" label="Reason for Seriousness" options={ SEVERITY_REASON }/>
        <TextInputField model={ model } name="medical_history" label="Relevant medical history, including any allergies" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="past_drug_therapy" label="Relevant Past Drug Therapy" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="lab_test_results" label="Laboratory test results" multiline = {true}
          numberOfLines = {4}/>
        <Text style={ AppStyles.boldText }>Current Medication</Text>
        <MedicationTableComponent model={ model } name="sadr_list_of_drugs"/>
        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => this.saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => this.saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => this.cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }

  saveAndContinue(next) {
    const { saveDraft } = this.props
    const { model } = this.state
    this.setState({ cancelType: 'Close' });
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
        if(model[field.name] == null || model[field.name] === "") {
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
    const { model } = this.state
    const { uploadData, saveCompleted, connection, token } = this.props
    if(connection.isConnected) {
      const url = SAE_URL + "/followup/" + btoa(model.parent_reference)
      uploadData(model, url, token)
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
    token: state.token
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

export default connect(mapStateToProps, mapDispatchToProps)(SAEFollowupScene)
