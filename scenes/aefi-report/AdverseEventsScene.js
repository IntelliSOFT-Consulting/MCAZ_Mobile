import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import FileInputComponent from '../components/FileInputComponent'

import { BOOLEAN_OPTIONS, AEFI_SEVERITY_REASON, BOOLEAN_UNKNOWN_OPTIONS, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS } from '../../utils/FieldOptions'

export default class AdverseEventsScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {}
  }

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <SelectMultipleField label="Adverse event (s):" name="adverse_events" model={ model } required={ true } options={ AEFI_ADVERSE_EVENTS }/>

        <TextInputField label="Other" name="adverse_events_specify" model={ model }/>
        <DateTimeInput label="Date &amp; Time AEFI started (DD/MM/YYYY):" name="aefi_date" model={ model } showTime={ true } maxDate={ new Date() } onChange={ this.onChange }/>
        <DateTimeInput label="Date patient notified event to health system (DD/MM/YYYY):" name="notification_date" model={ model } minDate={ this.state.aefi_date } maxDate={ new Date() }/>
        <TextInputField label="Describe AEFI (Signs and symptoms):" multiline={true} numberOfLines={4} name="description_of_reaction" model={ model }/>
        <SelectOneField label="Treatment provided:" options={ BOOLEAN_OPTIONS } name="treatment_provided" model={ model }/>
        <SelectOneField label="Serious:" options={ BOOLEAN_OPTIONS } name="serious" model={ model } required={ true }/>
        <SelectOneField label="If yes:" options={ AEFI_SEVERITY_REASON } name="serious_yes" model={ model }/>
        <TextInputField label="Outcome:" name="outcome" model={ model } required={ true } options={ AEFI_OUTCOME }/>
        <DateTimeInput label="If died, date of death (DD/MM/YYYY)::" name="died_date" model={ model } minDate={ this.state.aefi_date } maxDate={ new Date() }/>
        <SelectOneField label="Autopsy done:" name="autopsy" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <FileInputComponent name="reports" model={ model.reports[0] } label="Attach report"/>
        <TextInputField label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information
          (e.g. other cases). Use additional sheet if needed :" multiline={true} numberOfLines={4} name="past_medical_history" model={ model }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(4) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }

  onChange(value) {
    this.setState(value)
  }
}
