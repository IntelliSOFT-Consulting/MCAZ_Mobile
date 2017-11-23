import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineDilutentTableComponent from '../components/VaccineDilutentTableComponent'

export default class VaccinationScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="Name of vaccination centre:" name="name_of_vaccination_center" model={ model }/>
        <Text>Table</Text>
        <VaccineDilutentTableComponent model={ model } name="vaccination"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
