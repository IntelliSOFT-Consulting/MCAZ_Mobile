import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert, ScrollView, Button, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import DateTimeInput from './components/DateTimeInput'
import DateSelectInput from './components/DateSelectInput'
import VaccineTableComponent from "./components/VaccineTableComponent"
import FileAttachmentComponent from "./components/FileAttachmentComponent"

import ReadOnlyDataRenderer from './components/ReadOnlyDataRenderer'

import { connect } from 'react-redux'
import { REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'
import { AEFI_FOLLOW_UP_MANDATORY_FIELDS } from '../utils/FormFields'
import { BOOLEAN_OPTIONS, AEFI_SEVERITY_REASON, BOOLEAN_UNKNOWN_OPTIONS, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS } from '../utils/FieldOptions'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import DeviceInfo from 'react-native-device-info';

class AEFIReportFollowupScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Report Follow up',
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
      isConnected: connection.isConnected,
      validate: false,
      followUp: followUp
    }
  }

  render() {
    const { model } = this.state
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  }>
        <ReadOnlyDataRenderer name="parent_reference" model={ model } />
        <Text style={ AppStyles.boldText }>Vaccine/Dilutent</Text>
        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" label="Vaccine"/>

        <SelectMultipleField label="Adverse event (s):" name="adverse_events" model={ model } required={ true } options={ AEFI_ADVERSE_EVENTS }/>

        <TextInputField label="Other" name="adverse_events_specify" model={ model }/>
        <DateTimeInput label="Date &amp; Time AEFI started (DD/MM/YYYY):" name="aefi_date" model={ model } showTime={ true } maxDate={ new Date() } onChange={ this.onChange }/>
        <SelectOneField label="Was patient hospitalized?" name="patient_hospitalization" options={ BOOLEAN_OPTIONS } model={ model }/>
        <DateTimeInput label="Date patient notified event to health system (DD/MM/YYYY):" name="notification_date" model={ model } minDate={ this.state.aefi_date } maxDate={ new Date() }/>
        <TextInputField label="Describe AEFI (Signs and symptoms):" multiline={true} numberOfLines={4} name="description_of_reaction" model={ model }/>
        <SelectOneField label="Treatment provided:" options={ BOOLEAN_OPTIONS } name="treatment_provided" model={ model }/>

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
    AEFI_FOLLOW_UP_MANDATORY_FIELDS.forEach((field) => {
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
      const url = AEFI_URL + "/followup/" + btoa(model.parent_reference)
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

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportFollowupScene)
