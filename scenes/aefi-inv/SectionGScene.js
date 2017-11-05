import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionGScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" options={ ["Yes", "No"] }/>
        <TextInputField label="If yes, describe:" multiline={true} numberOfLines={4}/>
        <TextInputField label="If yes, how many events/episodes?" multiline={true} numberOfLines={4}/>
        <Text>Of those affected, how many are </Text>
        <TextInputField label="Vaccinated:" />
        <TextInputField label="Not vaccinated:" />
        <TextInputField label="Unknown:" />
        <TextInputField label="Other comments:" multiline={true} numberOfLines={4}/>
      </ScrollView>
    )
  }
}
