import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'

import { DESIGNATION, GENDER } from '../../utils/FieldOptions'

export default class PatientReporterDetailsScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="Patient first name:" name="patient_name" model={ model } required={ true }/>
        <TextInputField label="Surname" name="patient_surname" model={ model }/>
        <TextInputField label="Next of Kin:" name="patient_next_of_kin" model={ model }/>
        <TextInputField label="Patient’s physical address:" name="patient_address" model={ model } required={ true }/>
        <TextInputField label="Telephone:" keyboardType="phone-pad" name="patient_telephone" model={ model }/>
        <SelectOneField label="Gender:" name="gender" model={ model } options={ GENDER }/>
        <DateTimeInput label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true }/>
        <TextInputField label="OR Age at onset" name="age_at_onset" model={ model }/>
        <TextInputField label="Specify" name="age_at_onset_specify" model={ model }/>
        <TextInputField label="Reporter’s Name:" name="reporter_name" model={ model } required={ true }/>
        <SelectOneField label="Designation:" name="designation_id" model={ model } options={ DESIGNATION }/>
        <TextInputField label="Department:" name="reporter_department" model={ model }/>
        <TextInputField label="Address:" name="reporter_address" model={ model }/>
        <TextInputField label="District:" name="reporter_district" model={ model }/>
        <TextInputField label="Province:" name="reporter_province" model={ model }/>
        <TextInputField label="Telephone &amp; e-mail:" name="reporter_phone" model={ model }/>
        <TextInputField label="E-mail" name="reporter_email" model={ model }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
