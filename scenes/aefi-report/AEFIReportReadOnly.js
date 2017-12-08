import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import VaccineTableComponent from '../components/VaccineTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'

import AppStyles from '../../styles/AppStyles'

import { AEFI_SEVERITY_REASON, OUTCOME, BOOLEAN_UNKNOWN_OPTIONS, BOOLEAN_OPTIONS, DESIGNATION, GENDER } from '../../utils/FieldOptions'

export default class AEFIReportReadOnly extends Component{
  // <ReadOnlyDataRenderer label="MCAZ Reference Number (MCAZ use only)"/>
  render() {
    const { model, goBack } = this.props
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <ReadOnlyDataRenderer label="Patient first name:" name="patient_name" model={ model } required={ true }/>
        <ReadOnlyDataRenderer label="Surname" name="patient_surname" model={ model }/>
        <ReadOnlyDataRenderer label="Next of Kin:" name="patient_next_of_kin" model={ model }/>
        <ReadOnlyDataRenderer label="Patient’s physical address:" name="patient_address" model={ model } required={ true }/>
        <ReadOnlyDataRenderer label="Telephone:" keyboardType="phone-pad" name="patient_telephone" model={ model }/>
        <ReadOnlyDataRenderer label="Gender:" name="gender" model={ model } options={ GENDER }/>
        <ReadOnlyDataRenderer label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true } type="date"/>
        <ReadOnlyDataRenderer label="OR Age at onset" name="age_at_onset" model={ model }/>
        <ReadOnlyDataRenderer label="Specify" name="age_at_onset_specify" model={ model }/>
        <ReadOnlyDataRenderer label="Reporter’s Name:" name="reporter_name" model={ model } required={ true }/>
        <ReadOnlyDataRenderer label="Designation:" name="reporter_name" model={ model } options={ DESIGNATION }/>
        <ReadOnlyDataRenderer label="Department:" name="reporter_department" model={ model }/>
        <ReadOnlyDataRenderer label="Address:" name="reporter_address" model={ model }/>
        <ReadOnlyDataRenderer label="District:" name="reporter_district" model={ model }/>
        <ReadOnlyDataRenderer label="Province:" name="reporter_province" model={ model }/>
        <ReadOnlyDataRenderer label="Telephone &amp; e-mail:" name="reporter_phone" model={ model }/>
        <ReadOnlyDataRenderer label="E-mail:" name="reporter_email" model={ model }/>
        <ReadOnlyDataRenderer label="Today’s date (DD/MM/YYYY):" name="adverse_event_type" model={ model }/>

        <ReadOnlyDataRenderer label="Name of vaccination centre:" name="name_of_vaccination_center" model={ model }/>
        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" readonly={ true }/>
        <AEFIDilutentTableComponent model={ model } name="aefi_list_of_diluents" readonly={ true }/>

        <ReadOnlyDataRenderer label="Adverse event (s):" name="adverse_events" model={ model } required={ true } options={ [] }/>

        <ReadOnlyDataRenderer label="Other" name="adverse_events_specify" model={ model }/>
        <ReadOnlyDataRenderer label="Date &amp; Time AEFI started (DD/MM/YYYY)" name="aefi_date" model={ model } showTime={ true } type="date"/>
        <ReadOnlyDataRenderer label="Date patient notified event to health system (DD/MM/YYYY)" name="notification_date" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Describe AEFI (Signs and symptoms):" multiline={true} numberOfLines={4} name="description_of_reaction" model={ model }/>
        <ReadOnlyDataRenderer label="Treatment provided:" options={ BOOLEAN_OPTIONS } name="treatment_provided" model={ model }/>
        <ReadOnlyDataRenderer label="Serious:" options={ BOOLEAN_OPTIONS } name="serious" model={ model } required={ true }/>
        <ReadOnlyDataRenderer label="If yes:" options={ AEFI_SEVERITY_REASON } name="serious_yes" model={ model }/>
        <ReadOnlyDataRenderer label="Outcome:" name="outcome" model={ model } required={ true } options={ OUTCOME }/>
        <ReadOnlyDataRenderer label="If died, date of death (DD/MM/YYYY)::" name="died_date" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Autopsy done:" name="autopsy" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <ReadOnlyDataRenderer label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information
            (e.g. other cases). Use additional sheet if needed :" multiline={true} numberOfLines={4} name="past_medical_history" model={ model }/>

        <Text>First decision making level to complete (District level):</Text>
        <ReadOnlyDataRenderer label="Date report received at district level (DD/MM/YYYY):" name="district_receive_date" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Investigation needed:" options={ BOOLEAN_OPTIONS } name="investigation_needed" model={ model }/>
        <ReadOnlyDataRenderer label="If yes, date investigation planned (DD/MM/YYYY):" name="investigation_date" model={ model } type="date"/>
        <Text>National level to complete:</Text>
        <ReadOnlyDataRenderer label="Date report received at national level (DD/MM/YYYY):" name="national_receive_date" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Comments:" name="comments" model={ model }/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => goBack() } title="Close"/>
        </View>
      </ScrollView>
    )
  }
}
