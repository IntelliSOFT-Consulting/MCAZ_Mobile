import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { SAE_EVENT_TYPE, EVENT_TYPE, LOCATION_ADVERSE_EVENT, SAE_TOXICITY_GRADE, RESEARCH_INVOLVES, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class SectionBScene extends PureComponent {
  state = {}
  constructor(props, context) {
    super(props,context)
  }

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] }>
        <SelectOneField label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } validate={ this.state.validate } required={ true } options={ EVENT_TYPE }/>
        <SelectOneField label="2a. If SAE, is it" name="sae_type" model={ model } validate={ this.state.validate } required={ true } options={ SAE_EVENT_TYPE }/>
        <TextInputField label="If Other, specify" name="sae_description" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } validate={ this.state.validate } required={ true } options={ SAE_TOXICITY_GRADE }/>
        <SelectOneField label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS }/>
        <TextInputField label="If yes, how many?" name="previous_events_number" keyboardType="numeric" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="3b. Total Number of SAEs to date for the whole study:" keyboardType="numeric" name="total_saes" model={ model } validate={ this.state.validate } required={ true } />
        <SelectOneField label="4. Location of the current Adverse Event:" name="location_event" model={ model } validate={ this.state.validate } required={ true } options={ LOCATION_ADVERSE_EVENT }/>
        <TextInputField label="If Other, specify" name="location_event_specify" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="5. Research involves a:" name="research_involves" model={ model } validate={ this.state.validate } required={ true } options={ RESEARCH_INVOLVES }/>
        <TextInputField label="If Other, specify" name="research_involves_specify" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="6. Name of Drug, Device or Procedure:" name="name_of_drug" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="7. Is the drug/device investigational:" name="drug_investigational" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } color="#841584"  title="Save changes"/>
          <Button onPress={ () => cancel() } color="#841584"  title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
