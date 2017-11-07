import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import MedicationTableComponent from '../components/MedicationTableComponent'

import AppStyles from '../../styles/AppStyles'

export default class Medication extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Current Medication (Including OTC and herbals)</Text>
        <MedicationTableComponent model={ model } name="sadr_list_of_drugs"/>
        <SelectOneField model={ model } label="Action taken:" options={ ["one", "two"]}/>
        <SelectOneField model={ model } name="outcome" label="Outcome of ADR:" options={ ["one", "two"]}/>
        <SelectOneField model={ model } label="Relatedness of suspected medicine(s) to ADR:" options={ ["one", "two"]}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
