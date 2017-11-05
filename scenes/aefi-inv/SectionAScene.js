import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionAScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="Place of vaccination:"/>
        <SelectOneField label="Type of site"/>
        <SelectOneField label="Vaccination in"/>
        <TextInputField label="Name of Investigating Health Worker:"/>
        <TextInputField label="Designation / Position:" />
        <TextInputField label="Telephone # landline (with code):" keyboardType = 'phone-pad'/>
        <TextInputField label="Mobile:" keyboardType = 'phone-pad'/>
        <TextInputField label="Email:" keyboardType = 'email-address' />
        <TextInputField label="Date AEFI reported:"/>
        <TextInputField label="Date investigation started:"/>
        <TextInputField label="Date investigation completed:"/>
        <TextInputField label="Patient Name:"/>
        <SelectOneField label="Sex:"/>
        <TextInputField label="Date of hospitalization (DD/MM/YYYY):"/>
        <SelectOneField label="Status on the date of investigation:" />
        <TextInputField label="If died, date and time of death:"/>
        <TextInputField label="Autopsy done?"/>
        <TextInputField label="Date:" />
        <TextInputField label="Planned on Date:" />
      </ScrollView>
    )
  }
}
