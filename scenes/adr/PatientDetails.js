import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'
import AutoCompleteInput from '../components/AutoCompleteInput'

import { AGE_GROUP, GENDER } from '../../utils/FieldOptions'
import { getDateTimeFromString } from '../../utils/utils'

import moment from 'moment'

export default class PatientDetails extends PureComponent {

  constructor(props, context) {
    super(props, context)
    const { model } = this.props
    this.state = { model }
  }

  render() {
    const { model, saveAndContinue, cancel, validate, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null

    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.adrBackground] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        { followUpField }
        <Text style={ AppStyles.boldText }>Patient Details</Text>
        <AutoCompleteInput name="name_of_institution" model={ model } label="Clinical/Hospital Name :" returnKeyType="next"/>
        <TextInputField name="institution_code" model={ model } label="Clinical/Hospital Number :" returnKeyType="next"/>
        <TextInputField name="patient_name" model={ model } label="Patient Initials:" required={ true } validate={ this.props.validate } returnKeyType="next"/>
        <TextInputField name="ip_no" model={ model } label="VCT/OI/TB Number"/>
        <DateSelectInput name="date_of_birth" model={ model } label="Date of birth " required={ true } validate={ this.props.validate } maxDate={ new Date() } onDateChange={ this.onDateChange }/>
        <SelectOneField name="age_group" model={ model } label="Age group" options={ AGE_GROUP } value={ this.state.age_group }/>
        <TextInputField name="weight" model={ model } label="Weight(Kg)" keyboardType='numeric'/>
        <TextInputField name="height" model={ model } label="Height(cm)" keyboardType='numeric'/>
        <SelectOneField name="gender" model={ model } label="Gender" options={ GENDER } required={ true } validate={ this.props.validate }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }

  onDateChange = (value) => {
    const values = value.split("-")
    if(values[2] != "") {
      const time = moment().year(values[2]).month(values[1]).day(values[0])
      const now = moment()
      const age = now.diff(time, 'years', true);
      const months = now.diff(time, 'days', true);
      var age_group = ""
      if(months <= 28) {
        age_group = "neonate"
      } else if(age >= 50) {
        age_group = "elderly"
      } else if(age >= 19) {
        age_group = "adult"
      } else if(age >= 10) {
        age_group = "adolescent"
      } else {
        age_group = "child"
      }
      const { model } = this.props
      model['age_group'] = age_group
      this.setState({ age_group : age_group })
    }

  }

  /* <TextInputField label="MCAZ Reference Number (MCAZ use only)"/>
  shouldComponentUpdate(nextProps, nextState) {
    const { validate } = this.props
    const newValidate = nextProps.validate
    if(validate != newValidate) {
      return true
    }
    return false
  }*/
}

//https://snack.expo.io/rJxdeFIIb
