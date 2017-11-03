import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class AdverseReactionScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <TextInputField label="Date of onset"/>
        <TextInputField label="Duration"/>
        <TextInputField label="Description of ADR" multiline = {true}
         numberOfLines = {4}/>
        <SelectOneField label="Serious"/>
        <SelectMultipleField label="Reason for Seriousness" options={ ["One", "Two", "Three"] }/>
        <TextInputField label="Relevant medical history" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="Relevant Past Drug Therapy" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="Laboratory test results" multiline = {true}
          numberOfLines = {4}/>
      </ScrollView>
    )
  }
}
