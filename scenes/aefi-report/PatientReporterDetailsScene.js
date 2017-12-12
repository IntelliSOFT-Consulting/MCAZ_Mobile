import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'

import { DESIGNATION, GENDER, AGE_ON_ONSET, PROVINCES } from '../../utils/FieldOptions'

export default class PatientReporterDetailsScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        { followUpField }
        <TextInputField label="Patient first name:" name="patient_name" model={ model } required={ true }/>
        <TextInputField label="Surname" name="patient_surname" model={ model }/>
        <TextInputField label="Next of Kin:" name="patient_next_of_kin" model={ model }/>
        <TextInputField label="Patient’s physical address:" name="patient_address" model={ model } required={ true }/>
        <TextInputField label="Telephone:" keyboardType="phone-pad" name="patient_telephone" model={ model }/>
        <SelectOneField label="Gender:" name="gender" model={ model } options={ GENDER }/>
        <DateSelectInput label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true }/>
        <SelectOneField label="OR Age at onset" name="age_at_onset" model={ model } options={ AGE_ON_ONSET }/>
        <TextInputField label="Specify" name="age_at_onset_specify" model={ model } keyboardType="numeric"/>
        <TextInputField label="Reporter’s Name:" name="reporter_name" model={ model } required={ true }/>
        <SelectOneField label="Designation:" name="designation_id" model={ model } options={ DESIGNATION }/>
        <TextInputField label="Institution:" name="reporter_institution" model={ model }/>
        <TextInputField label="Department:" name="reporter_department" model={ model }/>
        <TextInputField label="Address:" name="reporter_address" model={ model }/>
        <TextInputField label="District:" name="reporter_district" model={ model }/>
        <SelectOneField label="Province:" name="province_id" model={ model } options={ PROVINCES }/>
        <TextInputField label="Telephone:" name="reporter_phone" model={ model } keyboardType="phone-pad"/>
        <TextInputField label="E-mail" name="reporter_email" model={ model } keyboardType="email-address"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
