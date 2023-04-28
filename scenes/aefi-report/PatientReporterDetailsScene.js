import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'
import AgeAtOnsetInput from '../components/AgeAtOnsetInput'

import { DESIGNATION, GENDER, AGE_ON_ONSET, PROVINCES, AGE_GROUP_YEARS_2, PREG_LAC } from '../../utils/FieldOptions'

export default class PatientReporterDetailsScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    const { model } = this.props
    this.state = { model }
  }

  validateDateofBirth = (value) => {
    if(value != '' && value != '--') {
      const { model } = this.state
      model['age_at_onset'] = ""
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
      this.onChange({ date_of_birth: value.date_of_birth, age_at_onset: "", age_at_onset_specify: '' })
    }

  }

  validateAge = (value) => {
    if(value != '') {
      const { model } = this.props
      model['date_of_birth'] = ''
      this.onChange({ date_of_birth : '', age_at_onset: value })
    }
  }

  validateAgeSpec = (value) => {
    var { model } = this.state
    if(value != '') {
      model['date_of_birth'] = ''
      this.onChange({ date_of_birth : '', age_at_onset_specify: value })
    }
  }

  onChange = (value) => {
    this.setState((prevState) => ({
      model: {...prevState.model, ...value}
    }), () => {
      this.props.handleModelChange(this.state.model)
    })
  }

  render() {
    const { saveAndContinue, cancel, followUp } = this.props;
    const { model } = this.state;
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        { followUpField }
        <TextInputField label="Patient name/Initials:" name="patient_name" model={ model } handleModelChange={this.props.handleModelChange}/>
        {/*<TextInputField label="Patient Surname" name="patient_surname" model={ model } />*/}
        <TextInputField label="Patient next of Kin:" name="patient_next_of_kin" model={ model } handleModelChange={this.props.handleModelChange}/>
        <TextInputField label="Patient’s physical address:" name="patient_address" model={ model } handleModelChange={this.props.handleModelChange}/>
        <TextInputField label="Patient Telephone:" keyboardType="phone-pad" name="patient_telephone" model={ model } handleModelChange={this.props.handleModelChange}/>
        <SelectOneField label="Gender:" name="gender" model={ model } options={ GENDER } onChange={this.onChange} />
        <SelectOneField label="If female" name="female_status" model={ model } options={ PREG_LAC } onChange={this.onChange}/>
        <DateTimeInput label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } maxDate={ new Date() } onChange={ this.validateDateofBirth } value={ this.state.model.date_of_birth }/>
        <AgeAtOnsetInput label="OR Age at onset" name="age_at_onset" model={ model } options={ AGE_ON_ONSET } value={ this.state.model.age_at_onset } onChange={ this.validateAge }/>
        <SelectOneField label="OR Age Group:" name="age_group" model={ model } options={ AGE_GROUP_YEARS_2 } />
        <TextInputField label="Reporter’s Name:" name="reporter_name" model={ model } onChange={this.onChange} />
        <SelectOneField label="Designation:" name="designation_id" model={ model } options={ DESIGNATION } required={ true } onChange={this.onChange}/>
        <TextInputField label="Institution:" name="reporter_institution" model={ model } handleModelChange={this.props.handleModelChange} />
        <TextInputField label="Department:" name="reporter_department" model={ model } handleModelChange={this.props.handleModelChange}/>
        <TextInputField label="Address:" name="reporter_address" model={ model } handleModelChange={this.props.handleModelChange}/>
        <TextInputField label="District:" name="reporter_district" model={ model } handleModelChange={this.props.handleModelChange}/>
        <SelectOneField label="Province:" name="province_id" model={ model } options={ PROVINCES } onChange={this.onChange}/>
        <TextInputField label="Reporter Telephone" name="reporter_phone" model={ model } keyboardType="phone-pad" handleModelChange={this.props.handleModelChange}/>
        <TextInputField label="Reporter  E-mail" name="reporter_email" model={ model } keyboardType="email-address" handleModelChange={this.props.handleModelChange}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
