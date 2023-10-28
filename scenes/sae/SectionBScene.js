import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { SAE_EVENT_TYPE, EVENT_TYPE, LOCATION_ADVERSE_EVENT, SAE_TOXICITY_GRADE, RESEARCH_INVOLVES, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'
import CheckBoxInput from '../components/CheckBoxInput';

export default class SectionBScene extends PureComponent {
  state = {
    adverse_event_type: null,
    previous_events: null,
    location_event: null,
    research_involves: null
  }
  constructor(props, context) {
    super(props,context)
  }

  onSelectChange = (value) =>{
    this.setState(value);
    if (value['adverse_event_type']) {
      if (value['adverse_event_type'] === 'SAE') {
        this.props.model['sae_description'] = '';
      } else {
        delete this.props.model['sae_type'];
      }
    }
    if (value['previous_events']) {
      if (value['previous_events'] != 'Yes') {
        this.props.model['previous_events_number'] = null;
      }
    }
    if (value['location_event']) {
      if (value['location_event'] !== 'Other') {
        value['location_event_specify'] = null;
      }
    }
    if (value['research_involves']) {
      if (value['research_involves'] != 'Other') {
        this.props.model['research_involves_specify'] = null;
      }
    }
  }

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props

    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] } keyboardShouldPersistTaps={'handled'}>
        <SelectOneField label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } validate={ this.state.validate } required={ true } options={ EVENT_TYPE } onChange={ this.onSelectChange }/>
        <SelectOneField label="2a. If SAE, is it" name="sae_type" model={ model } validate={ this.state.validate } options={ SAE_EVENT_TYPE }/>
        <TextInputField label="If Other, specify" name="sae_description" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <SelectOneField label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } validate={ this.state.validate } options={ SAE_TOXICITY_GRADE }/>
        <SelectOneField label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } validate={ this.state.validate } options={ BOOLEAN_OPTIONS } onChange={ this.onSelectChange }/>
        {
          this.state.previous_events === 'Yes' &&
          (<TextInputField label="If yes, how many?" name="previous_events_number" keyboardType="numeric" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>)
        }
        <TextInputField label="3b. Total Number of SAEs to date for the whole study:" keyboardType="numeric" name="total_saes" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <SelectOneField label="4. Location of the current Adverse Event:" name="location_event" model={ model } validate={ this.state.validate } options={ LOCATION_ADVERSE_EVENT } onChange={ this.onSelectChange }/>
        {
          this.state.location_event === 'Other' &&
          (<TextInputField label="If Other, specify" name="location_event_specify" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>)
        }
        <SelectOneField label="5. Research involves a:" name="research_involves" model={ model } validate={ this.state.validate } options={ RESEARCH_INVOLVES } onChange={ this.onSelectChange }/>
        {
          this.state.research_involves === 'Other' &&
          (<TextInputField label="If Other, specify" name="research_involves_specify" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>)
        }
        <TextInputField label="6. Name of Drug, Device or Procedure:" name="name_of_drug" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <SelectOneField label="7. Is the drug/device investigational:" name="drug_investigational" model={ model } validate={ this.state.validate } options={ BOOLEAN_OPTIONS } />
        <CheckBoxInput model={model} name="in_utero" label={'Did reaction occur in utero?'} />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } color="#841584"  title="Save changes"/>
          <Button onPress={ () => cancel() } color="#841584"  title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }


}
