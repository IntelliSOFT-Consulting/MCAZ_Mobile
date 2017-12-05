import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'

import AppStyles from '../../styles/AppStyles'

import { OUTCOME, ACTION_TAKEN, RELATEDNESS_TO_ADR } from '../../utils/FieldOptions'

export default class Medication extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel } = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ] }>
        <Text style={ AppStyles.boldText }>Current Medication</Text>
        <MedicationTableComponent model={ model } name="sadr_list_of_drugs"/>
        <ConcomitantTableComponent model={ model } name="sadr_other_drugs" label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken:"/>
        <SelectOneField model={ model } label="Action taken:" name="action_taken" required={ true } options={ ACTION_TAKEN }/>
        <SelectOneField model={ model } name="outcome" label="Outcome of ADR:" options={ OUTCOME } required={ true }/>
        <SelectOneField model={ model } name="relatedness" label="Relatedness of suspected medicine(s) to ADR:" options={ RELATEDNESS_TO_ADR }/>
        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
