import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'

export default class AdverseReactionScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <DateTimeInput model={ model } name="date_of_onset_of_reaction" label="Date of onset*"/>
        <SelectOneField model={ model } name="duration_type" label="Duration type"/>
        <TextInputField model={ model } name="duration" label="Duration"/>
        <TextInputField model={ model } name="description_of_reaction" label="Description of ADR*" multiline = {true}
         numberOfLines = {4}/>
        <SelectOneField model={ model } name="severity" label="Serious*"/>
        <SelectOneField model={ model } name="severity_reason" label="Reason for Seriousness" options={ ["One", "Two", "Three"] }/>
        <TextInputField model={ model } name="medical_history" label="Relevant medical history" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="past_drug_therapy" label="Relevant Past Drug Therapy" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField model={ model } name="lab_test_results" label="Laboratory test results" multiline = {true}
          numberOfLines = {4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
