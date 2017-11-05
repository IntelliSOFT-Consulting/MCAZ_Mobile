import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineDilutentTableComponent from '../components/VaccineDilutentTableComponent'

export default class VaccinationScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="Name of vaccination centre:"/>
        <Text>Table</Text>
        <VaccineDilutentTableComponent />
      </ScrollView>
    )
  }
}
