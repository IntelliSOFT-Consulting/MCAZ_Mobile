import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionBScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="Past history of similar event" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Adverse event after previous vaccination(s)" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="History of allergy to vaccine, drug or food" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Pre-existing illness (30 days) / congenital disorder" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="History of hospitalization in last 30 days, with cause" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Was patient on medication at time of vaccination? (If yes, name the drug, indication, doses &amp; treatment dates)" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" multiline = {true}
          numberOfLines = {4}/>
        <SelectOneField label="Did patient consult faith healers before/after vaccination? *specify" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Family history of any disease (relevant to AEFI) or allergy" options={ ["Yes", "No"]}/>
        <Text>For adult women</Text>
        <SelectOneField label="Currently pregnant?"/>
        <TextInputField label="(weeks)" />
        <Text>For infants</Text>
        <SelectOneField label="The birth was"/>
        <TextInputField label="Birth weight:"/>
        <SelectOneField label="Delivery procedure was:" />
        <TextInputField label="Specify:"/>
      </ScrollView>
    )
  }
}
