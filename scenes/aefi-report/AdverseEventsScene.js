import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class AdverseEventsScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="*Adverse event (s):" />

        <TextInputField label="Other" />
        <TextInputField label="Date patient notified event to health system (DD/MM/YYYY):" />

        <SelectOneField label="Treatment provided:" options={ ["one", "two"]}/>
        <SelectOneField label="*Serious:" options={ ["one", "two"]}/>
        <SelectOneField label="If yes:" options={ ["one", "two"]}/>
        <TextInputField label="*Outcome:"/>
        <TextInputField label="If died, date of death (DD/MM/YYYY)::"/>
        <SelectOneField label="Autopsy done:" />
        <TextInputField label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information
          (e.g. other cases). Use additional sheet if needed :" multiline={true} numberOfLines={4}/>
      </ScrollView>
    )
  }
}
