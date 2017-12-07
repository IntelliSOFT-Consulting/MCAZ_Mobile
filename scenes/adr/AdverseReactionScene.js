import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'

import { SEVERITY_REASON, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class AdverseReactionScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  }>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <DateSelectInput model={ model } name="date_of_onset_of_reaction" label="Date of onset" required={ true } onChange={ this.onChange } maxDate={ new Date() }/>
        <DateSelectInput model={ model } name="date_of_end_of_reaction" label="Date of end of reaction (If ended)" maxDate={ new Date() } minDate={ this.state.date_of_onset_of_reaction }/>

        <TextInputField model={ model } name="description_of_reaction" label="Description of ADR" multiline = {true}
         numberOfLines = {4} required={ true }/>
        <SelectOneField model={ model } name="severity" label="Serious " required={ true } options={ BOOLEAN_OPTIONS }/>
        <SelectOneField model={ model } name="severity_reason" label="Reason for Seriousness" options={ SEVERITY_REASON }/>
        <TextInputField model={ model } name="medical_history" label="Relevant medical history, including any allergies" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="past_drug_therapy" label="Relevant Past Drug Therapy" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="lab_test_results" label="Laboratory test results" multiline = {true}
          numberOfLines = {4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }

  onChange(value) {
    this.setState(value)
  }
}
