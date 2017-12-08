import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS } from '../../utils/FieldOptions'

export default class SectionGScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField model={ model } name="similar_events" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" />
        <TextInputField model={ model } name="similar_events_describe" label="If yes, describe:" multiline={true} numberOfLines={4}/>
        <TextInputField model={ model } name="similar_events_episodes" label="If yes, how many events/episodes?" multiline={true} numberOfLines={4} keyboardType="numeric"/>
        <Text>Of those affected, how many are </Text>
        <TextInputField model={ model } name="affected_vaccinated" label="Vaccinated:" keyboardType="numeric"/>
        <TextInputField model={ model } name="affected_not_vaccinated" label="Not vaccinated:" keyboardType="numeric"/>
        <TextInputField model={ model } name="affected_unknown" label="Unknown:" keyboardType="numeric"/>
        <TextInputField model={ model } name="community_comments" label="Other comments:" multiline={true} numberOfLines={4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
