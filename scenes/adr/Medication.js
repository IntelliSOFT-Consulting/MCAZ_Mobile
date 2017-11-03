import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import MedicationTableComponent from '../components/MedicationTableComponent'

import AppStyles from '../../styles/AppStyles'

export default class Medication extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Current Medication (Including OTC and herbals)</Text>
        <MedicationTableComponent />
        <SelectOneField label="Action taken:" options={ ["one", "two"]}/>
        <SelectOneField label="Outcome of ADR:" options={ ["one", "two"]}/>
        <SelectOneField label="Relatedness of suspected medicine(s) to ADR:" options={ ["one", "two"]}/>
      </ScrollView>
    )
  }
}
