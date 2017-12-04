import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'

import { AGE_GROUP, GENDER } from '../../utils/FieldOptions'

export default class PatientDetails extends PureComponent {

  constructor(props, context) {
    super(props, context)
    const { model } = this.props
  }

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.adrBackground] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MCAZ Reference Number (MCAZ use only)"/>
        <Text style={ AppStyles.boldText }>Patient Details</Text>
        <TextInputField name="name_of_institution" model={ model } label="Clinical/Hospital Name :"/>
        <TextInputField name="institution_code" model={ model } label="Clinical/Hospital Number :"/>
        <TextInputField name="patient_name" model={ model } label="Patient Initials:" required={ true } validate={ this.props.validate }/>
        <TextInputField name="ip_no" model={ model } label="VCT/OI/TB Number"/>
        <DateTimeInput name="date_of_birth" model={ model } label="Date of birth " required={ true } validate={ this.props.validate } maxDate={ new Date() }/>
        <SelectOneField name="age_group" model={ model } label="Age group" options={ AGE_GROUP }/>
        <TextInputField name="weight" model={ model } label="Weight(Kg)" keyboardType='numeric'/>
        <TextInputField name="height" model={ model } label="Height(meters)" keyboardType='numeric'/>
        <SelectOneField name="gender" model={ model } label="Gender" options={ GENDER } required={ true } validate={ this.props.validate }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    const { validate } = this.props
    const newValidate = nextProps.validate
    if(validate != newValidate) {
      return true
    }
    return false
  }*/
}
