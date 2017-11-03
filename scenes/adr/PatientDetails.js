import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class PatientDetails extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MCAZ Reference Number (MCAZ use only)"/>
        <Text style={ AppStyles.boldText }>Patient Details</Text>
        <TextInputField label="Clinical/Hospital Name :"/>
        <TextInputField label="Clinical/Hospital Number :"/>
        <TextInputField label="Patient Initials:"/>
        <TextInputField label="VCT/OI/TB Number"/>
        <TextInputField label="Date of birth"/>
        <TextInputField label="Weight(Kg)"/>
        <TextInputField label="Age"/>
        <TextInputField label="Height(meters)"/>
        <TextInputField label="Sex"/>
      </ScrollView>
    )
  }
}
