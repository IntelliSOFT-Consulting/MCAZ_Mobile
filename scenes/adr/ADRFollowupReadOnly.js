import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'

import AppStyles from '../../styles/AppStyles'

import { SEVERITY_REASON, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'
import { REPORT_TYPE_ADR_FOLLOW_UP } from "../../utils/Constants"

export default class ADRFollowupReadOnly extends Component{
  // <ReadOnlyDataRenderer label="MCAZ Reference Number (MCAZ use only)"/>
  render() {
    const { model, goBack } = this.props

    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ] }>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <ReadOnlyDataRenderer model={ model } name="date_of_onset_of_reaction" label="Date of onset" type="date"/>
        <ReadOnlyDataRenderer model={ model } name="date_of_end_of_reaction" label="Date of end of reaction (If ended)" type="date"/>

        <ReadOnlyDataRenderer model={ model } name="description_of_reaction" label="Description of ADR" type="text"/>
        <ReadOnlyDataRenderer model={ model } name="severity" label="Serious " required={ true } type="text" options={ BOOLEAN_OPTIONS }/>
        <ReadOnlyDataRenderer model={ model } name="severity_reason" label="Reason for Seriousness"  type="text" options={ SEVERITY_REASON }/>
        <ReadOnlyDataRenderer model={ model } name="medical_history" label="Relevant medical history" type="text" />
        <ReadOnlyDataRenderer model={ model } name="past_drug_therapy" label="Relevant Past Drug Therapy" type="text"/>
        <ReadOnlyDataRenderer model={ model } name="lab_test_results" label="Laboratory test results" type="text"/>

        <Text style={ AppStyles.boldText }>Current Medication (Including OTC and herbals)</Text>
        <MedicationTableComponent model={ model } name="sadr_list_of_drugs" readonly={ true }/>

        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files" readonly={ true }/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => goBack() } title="Close"/>
        </View>
      </ScrollView>
    )
  }

}
