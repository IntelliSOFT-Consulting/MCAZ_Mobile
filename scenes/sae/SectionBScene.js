import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionBScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="1. What type of adverse event is this?" options={ ["one", "two"]}/>
        <SelectOneField label="2a. If SAE, is it:" options={ ["one", "two"]}/>
        <SelectOneField label="2b. Toxicity Grade:"/>
        <SelectOneField label="3a. Any previous Adverse Event’s report on this participant?:"/>
        <TextInputField label="If yes, how many?"/>
        <SelectOneField label="3b. Total Number of SAEs to date for the whole study:" />
        <SelectOneField label="4. Location of the current Adverse Event:" />
        <SelectOneField label="5. Research involves a:" />
        <SelectOneField label="6. Name of Drug, Device or Procedure:"/>
        <SelectOneField label="7. Is the drug/device investigational:" />
      </ScrollView>
    )
  }
}
