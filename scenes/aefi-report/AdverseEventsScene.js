import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import FileInputComponent from '../components/FileInputComponent'
import AEFIEventsSelectOneField from '../components/AEFIEventsSelectOneField'

import { BOOLEAN_OPTIONS, AEFI_SEVERITY_REASON, BOOLEAN_UNKNOWN_OPTIONS, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS, SEVERE_LOCAL_REACTIONS, SEIZURES } from '../../utils/FieldOptions'

export default class AdverseEventsScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    const { model } = this.props
    this.state = { model }
  }

  render() {
    const { model, saveAndContinue, cancel } = this.props
    const autopsyDod = this.state.outcome === 'Died' ? (
      <View>
        <DateTimeInput label="If died, date of death (DD/MM/YYYY)::" name="died_date" model={ model } minDate={ this.state.aefi_date } maxDate={ new Date() }/>
        <SelectOneField label="Autopsy done:" name="autopsy" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS }/>
      </View>
    ) : null;
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        <SelectMultipleField label="Adverse event (s):" name="adverse_events" model={ model } options={ AEFI_ADVERSE_EVENTS }/>
        <AEFIEventsSelectOneField name="reactions" model={ model } label="Local reactions" options={ SEVERE_LOCAL_REACTIONS }/>
        <AEFIEventsSelectOneField name="seizures" model={ model } label="Seizures" options={ SEIZURES }/>
        <TextInputField label="Other" name="adverse_events_specify" model={ model }/>
        <DateTimeInput label="Date &amp; Time AEFI started (DD/MM/YYYY):" name="aefi_date" model={ model } showTime={ true } maxDate={ new Date() } onChange={ this.onChange }/>
        <SelectOneField label="Was patient hospitalized?" name="patient_hospitalization" options={ BOOLEAN_OPTIONS } model={ model }/>
        <DateTimeInput label="Date patient notified event to health system (DD/MM/YYYY):" name="notification_date" model={ model } minDate={ this.state.aefi_date } maxDate={ new Date() }/>
        <TextInputField label="Describe AEFI (Signs and symptoms):" multiline={true} numberOfLines={4} name="description_of_reaction" model={ model } />
        <SelectOneField label="Treatment provided:" options={ BOOLEAN_OPTIONS } name="treatment_provided" model={ model }/>
        <SelectOneField label="Serious:" options={ BOOLEAN_OPTIONS } name="serious" model={ model }  onChange={this.onChange}/>
        {this.state.serious == 'Yes' && (<SelectOneField label="If yes:" options={ AEFI_SEVERITY_REASON } name="serious_yes" model={ model }/>)}
        <SelectOneField label="Outcome:" name="outcome" model={ model } options={ AEFI_OUTCOME } onChange={this.onChange}/>
        { autopsyDod }
        <FileInputComponent name="reports" model={ model.reports[0] } label="Attach report"/>
        <TextInputField label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information
          (e.g. other cases). Use additional sheet if needed :" multiline={true} numberOfLines={4} name="past_medical_history" model={ model }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(4) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onChange(value) {
    this.setState(value)
  }
}
