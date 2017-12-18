import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'
import AgeAtOnsetInput from '../components/AgeAtOnsetInput'

import { DESIGNATION, GENDER, AGE_ON_ONSET, PROVINCES } from '../../utils/FieldOptions'

export default class PatientReporterDetailsScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    const { model } = this.props
    this.state = { model }
  }

  validateDateofBirth = (value) => {
    if(value != '' && value != '--') {
      const { model } = this.props
      model['age_at_onset'] = ""
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
      model['age_at_onset_specify'] = ""
      this.setState({ date_of_birth: value, age_at_onset: "", age_at_onset_specify: '' })
    }

  }

  validateAge = (value) => {
    if(value != '') {
      const { model } = this.props
      model['date_of_birth'] = ''
      this.setState({ date_of_birth : '', age_at_onset: value })
    }
  }

  validateAgeSpec = (value) => {
    var { model } = this.state
    if(value != '') {
      model['date_of_birth'] = ''
      this.setState({ date_of_birth : '', age_at_onset_specify: value })
    }
  }

  render() {
    const { model, saveAndContinue, cancel, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        { followUpField }
        <TextInputField label="Patient first name:" name="patient_name" model={ model } required={ true }/>
        <TextInputField label="Patient Surname" name="patient_surname" model={ model }/>
        <TextInputField label="Patient next of Kin:" name="patient_next_of_kin" model={ model }/>
        <TextInputField label="Patient’s physical address:" name="patient_address" model={ model } required={ true }/>
        <TextInputField label="Patient Telephone:" keyboardType="phone-pad" name="patient_telephone" model={ model }/>
        <SelectOneField label="Gender:" name="gender" model={ model } options={ GENDER }/>
        <DateSelectInput label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true } maxDate={ new Date() } onDateChange={ this.validateDateofBirth } value={ this.state.date_of_birth }/>
        <AgeAtOnsetInput label="OR Age at onset" name="age_at_onset" model={ model } options={ AGE_ON_ONSET } value={ this.state.age_at_onset } onChange={ this.validateAge }/>
        <TextInputField label="Specify" name="age_at_onset_specify" model={ model } keyboardType="numeric" value={ this.state.age_at_onset_specify } onChange={ this.validateAgeSpec }/>
        <TextInputField label="Reporter’s Name:" name="reporter_name" model={ model } required={ true }/>
        <SelectOneField label="Designation:" name="designation_id" model={ model } options={ DESIGNATION }/>
        <TextInputField label="Institution:" name="reporter_institution" model={ model }/>
        <TextInputField label="Department:" name="reporter_department" model={ model }/>
        <TextInputField label="Address:" name="reporter_address" model={ model }/>
        <TextInputField label="District:" name="reporter_district" model={ model }/>
        <SelectOneField label="Province:" name="province_id" model={ model } options={ PROVINCES }/>
        <TextInputField label="Reporter Telephone" name="reporter_phone" model={ model } keyboardType="phone-pad"/>
        <TextInputField label="Reporter  E-mail" name="reporter_email" model={ model } keyboardType="email-address"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
