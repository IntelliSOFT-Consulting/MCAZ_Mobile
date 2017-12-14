import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineTableComponent from '../components/VaccineTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'

export default class VaccinationScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <TextInputField label="Name of vaccination centre:" name="name_of_vaccination_center" model={ model }/>
        <Text style={ AppStyles.boldText }>Vaccine</Text>
        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" label="Vaccine"/>
        <Text style={ AppStyles.boldText }>Dilutent</Text>
        <AEFIDilutentTableComponent model={ model } name="aefi_list_of_diluents" name="Diluent"/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
