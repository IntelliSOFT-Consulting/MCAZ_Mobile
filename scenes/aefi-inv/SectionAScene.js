import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import FileInputComponent from '../components/FileInputComponent'
import VaccineTableComponent from '../components/VaccineTableComponent'
import DateSelectInput from '../components/DateSelectInput'
import AgeAtOnsetInput from '../components/AgeAtOnsetInput'

import { BOOLEAN_OPTIONS, GENDER, STATUS_ON_DATE, DESIGNATION, PLACE_VACCINATION, SITE_TYPE, VACCINATION_IN, PROVINCES, AGE_GROUP_YEARS } from '../../utils/FieldOptions'

export default class SectionAScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    const { model } = this.props
    this.state = { model }
  }

  render() {
    const { model, saveAndContinue, cancel, validate, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        { followUpField }
        <SelectOneField label="Province:" name="province_id" model={ model } options={ PROVINCES }/>
        <TextInputField label="District:" name="district" model={ model }/>
        <TextInputField label="AEFI Report ID" name="aefi_report_ref" model={ model }/>
        <TextInputField label="Name of vaccination site " model={ model } name="name_of_vaccination_site" />
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
        <DateTimeInput label="Date investigation completed:" model={ model } name="complete_date" maxDate={ new Date() } minDate={ this.state.start_date }/>
        <TextInputField label="Patient Name:" model={ model } name="patient_name"/>
        <SelectOneField label="Gender:" model={ model } name="gender" options={ GENDER }/>
        <TextInputField label="Patient’s physical address" model={ model } name="patient_address"/>
        <DateSelectInput label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true } maxDate={ new Date() } onDateChange={ this.validateDateofBirth } value={ this.state.date_of_birth }/>
        <AgeAtOnsetInput label="OR Age at onset" name="age_at_onset" model={ model } value={ this.state.age_at_onset } onChange={ this.validateAge }/>
        <SelectOneField label="OR Age group:" model={ model } name="age_group" options={ AGE_GROUP_YEARS }/>
        <Text>*Complete below table if vaccination information missing on the AEFI reporting form</Text>
        <Text style={ AppStyles.boldText }>Vaccine/Dilutent</Text>
        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" label="Vaccine"/>

        <DateTimeInput label="Date of first/key symptom (DD/MM/YYYY)" model={ model } name="hospitalization_date" maxDate={ this.state.complete_date } showTime={ true }/>
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

  validateDateofBirth = (value) => {
    if(value != '' && value != '--') {
      const { model } = this.props
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
      model['age_group'] = ""
      this.setState({ date_of_birth: value, age_at_onset_months: "", age_at_onset_days: '', age_at_onset_years: "", age_group: "" })
    }
  }

  validateAge = (value) => {
    if(value != '') {
      const { model } = this.props
      model['date_of_birth'] = ''
      model['age_group'] = ""
      this.setState({ date_of_birth : '', age_at_onset: value, age_group: "" })
    }
  }

  onChange(value) {
    this.setState(value)
  }
}
