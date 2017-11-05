import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionAScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MRCZ Protocol #:"/>
        <TextInputField label="MCAZ Protocol #"/>
        <TextInputField label="Institution"/>
        <TextInputField label="Principle Investigator:"/>
        <TextInputField label="Phone:" keyboardType = 'email-address'/>
        <TextInputField label="Email:" keyboardType = 'phone-pad' />
        <TextInputField label="Report prepared by:"/>
        <TextInputField label="Designation in the study:"/>
        <TextInputField label="Date Form completed"/>
        <TextInputField label="Study Title:"/>
        <TextInputField label="Study Sponsor:"/>
        <TextInputField label="Date of Adverse Event:"/>
        <TextInputField label="Participant ID:" />
        <SelectOneField label="Hosp. Num.:"/>
        <SelectOneField label="Date of Site Awareness:"/>
        <TextInputField label="Date of Birth:" />
        <SelectOneField label="Sex:" />
        <SelectOneField label="Type of Report:" />
        <TextInputField label="Study week:-"/>
        <TextInputField label="Visit number:-"/>
      </ScrollView>
    )
  }
}
