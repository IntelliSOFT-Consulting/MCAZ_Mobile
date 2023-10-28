import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import VaccineTableComponent from '../components/VaccineTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'

import AppStyles from '../../styles/AppStyles'

import { AEFI_SEVERITY_REASON, OUTCOME, BOOLEAN_UNKNOWN_OPTIONS, BOOLEAN_OPTIONS, DESIGNATION, GENDER, PROVINCES, AEFI_OUTCOME } from '../../utils/FieldOptions'

import { REPORT_TYPE_AEFI_FOLLOW_UP } from "../../utils/Constants"

export default class AEFIFollowupReadOnly extends Component{
  // <ReadOnlyDataRenderer label="MCAZ Reference Number (MCAZ use only)"/>
  render() {
    const { model, goBack } = this.props

    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" readonly={ true }/>
        <ReadOnlyDataRenderer label="Adverse event (s):" name="adverse_events" model={ model } required={ true } options={ [] }/>
        <ReadOnlyDataRenderer label="Other" name="adverse_events_specify" model={ model }/>
        <ReadOnlyDataRenderer label="Date &amp; Time AEFI started (DD/MM/YYYY)" name="aefi_date" model={ model } showTime={ true } type="date"/>
        <ReadOnlyDataRenderer label="Date patient notified event to health system (DD/MM/YYYY)" name="notification_date" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Describe AEFI (Signs and symptoms):" multiline={true} numberOfLines={4} name="description_of_reaction" model={ model }/>
        <ReadOnlyDataRenderer label="Treatment provided:" options={ BOOLEAN_OPTIONS } name="treatment_provided" model={ model }/>
        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files" readonly={ true }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => goBack() } title="Close"/>
        </View>
      </ScrollView>
    )
  }
}
