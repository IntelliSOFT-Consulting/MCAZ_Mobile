import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import FileInputComponent from '../components/FileInputComponent'

import { BOOLEAN_OPTIONS, GENDER, STATUS_ON_DATE, DESIGNATION, PLACE_VACCINATION, SITE_TYPE, VACCINATION_IN } from '../../utils/FieldOptions'

export default class SectionAScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.state = {}
  }

  render() {
    const { model, saveAndContinue, cancel, validate, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        { followUpField }
        <TextInputField label="Basic details" model={ model } name="basic_details" />
        <SelectOneField label="Place of vaccination:" model={ model } name="place_vaccination" options={ PLACE_VACCINATION }/>
        <TextInputField label="If other, specify" model={ model } name="place_vaccination_other" />
        <SelectOneField label="Type of site" model={ model } name="site_type" options={ SITE_TYPE }/>
        <TextInputField label="If other, specify" model={ model } name="site_type_other" />
        <SelectOneField label="Vaccination in" model={ model } name="vaccination_in" options={ VACCINATION_IN }/>
        <TextInputField label="If other, specify" model={ model } name="vaccination_in_other" />
        <TextInputField label="Name of Investigating Health Worker:" model={ model } name="reporter_name"/>
        <SelectOneField label="Designation / Position:" model={ model } name="designation_id" options={ DESIGNATION }/>
        <TextInputField label="Telephone # landline (with code):" keyboardType = 'phone-pad' model={ model } name="telephone"/>
        <TextInputField label="Mobile:" keyboardType = 'phone-pad' model={ model } name="mobile"/>
        <TextInputField label="Email:" keyboardType = 'email-address' model={ model } name="reporter_email"/>
        <DateTimeInput label="Date AEFI reported:" model={ model } name="report_date" maxDate={ new Date() } onChange={ this.onChange }/>
        <DateTimeInput label="Date investigation started:" model={ model } name="start_date" maxDate={ new Date() } minDate={ this.state.report_date } onChange={ this.onChange }/>
        <DateTimeInput label="Date investigation completed:" model={ model } name="complete_date" maxDate={ new Date() } minDate={ this.state.start_date}/>
        <TextInputField label="Patient Name:" model={ model } name="patient_name"/>
        <SelectOneField label="Gender:" model={ model } name="gender" options={ GENDER }/>
        <DateTimeInput label="Date of hospitalization (DD/MM/YYYY):" model={ model } name="hospitalization_date" maxDate={ new Date() }/>
        <SelectOneField label="Status on the date of investigation:" model={ model } name="status_on_date" options={ STATUS_ON_DATE }/>
        <DateTimeInput label="If died, date and time of death:" model={ model } name="died_date" maxDate={ new Date() } onChange={ this.onChange } showTime={ true }/>
        <SelectOneField label="Autopsy done?" model={ model } name="autopsy_done" options={ BOOLEAN_OPTIONS }/>
        <DateTimeInput label="Date:" model={ model } name="autopsy_done_date" maxDate={ new Date() } minDate={ this.state.died_date }/>
        <SelectOneField label="Autopsy planned?" model={ model } name="autopsy_planned" options={ BOOLEAN_OPTIONS }/>
        <DateTimeInput label="Planned on Date:" model={ model } name="autopsy_planned_date" minDate={ new Date() }/>
        <FileInputComponent name="reports" model={ model.reports[0] } label="Attach report"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onChange(value) {
    this.setState(value)
  }
}
