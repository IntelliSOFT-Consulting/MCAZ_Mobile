import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class PatientReporterDetailsScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="*Patient first name:"/>
        <TextInputField label="Surname"/>
        <TextInputField label="Next of Kin:"/>
        <TextInputField label="*Patient’s physical address:"/>
        <TextInputField label="Telephone:" keyboardType="phone-pad"/>
        <SelectOneField label="Sex:"/>
        <TextInputField label="*Date of birth (DD/MM/YYYY):"/>
        <TextInputField label="OR Age at onset"/>
        <TextInputField label="*Reporter’s Name:"/>
        <TextInputField label="Designation, Department &amp; address:"/>

        <TextInputField label="District:"/>
        <TextInputField label="Province:"/>
        <TextInputField label="Telephone &amp; e-mail:"/>
        <TextInputField label="Today’s date (DD/MM/YYYY):"/>
      </ScrollView>
    )
  }
}
