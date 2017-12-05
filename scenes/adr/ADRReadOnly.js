import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'

import AppStyles from '../../styles/AppStyles'

import { SEVERITY_REASON, OUTCOME, ACTION_TAKEN, RELATEDNESS_TO_ADR, DESIGNATION } from '../../utils/FieldOptions'

export default class ADRReadOnly extends Component{
  // <ReadOnlyDataRenderer label="MCAZ Reference Number (MCAZ use only)"/>
  render() {
    const { model, goBack} = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <Text style={ AppStyles.boldText }>Patient Details</Text>

        <ReadOnlyDataRenderer name="name_of_institution" model={ model } label="Clinical/Hospital Name :" type="text"/>
        <ReadOnlyDataRenderer name="institution_code" model={ model } label="Clinical/Hospital Number :" type="text"/>
        <ReadOnlyDataRenderer name="patient_name" model={ model } label="Patient Initials:" type="text"/>
        <ReadOnlyDataRenderer name="ip_no" model={ model } label="VCT/OI/TB Number" type="text"/>
        <ReadOnlyDataRenderer name="date_of_birth" model={ model } label="Date of birth " type="date"/>
        <ReadOnlyDataRenderer name="weight" model={ model } label="Weight(Kg)" keyboardType='numeric' type="text"/>
        <ReadOnlyDataRenderer name="age_group" model={ model } label="Age group" type="text" options={["", "neonate", "infant", "child", "adolescent", "adult", "elderly"]}/>
        <ReadOnlyDataRenderer name="height" model={ model } label="Height(meters)" type="text"/>
        <ReadOnlyDataRenderer name="gender" model={ model } label="Gender" type="text"/>

        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <ReadOnlyDataRenderer model={ model } name="date_of_onset_of_reaction" label="Date of onset" type="date"/>
        <ReadOnlyDataRenderer model={ model } name="date_of_end_of_reaction" label="Date of end of reaction (If ended)" type="date"/>

        <ReadOnlyDataRenderer model={ model } name="description_of_reaction" label="Description of ADR" type="text"/>
        <ReadOnlyDataRenderer model={ model } name="severity" label="Serious " required={ true } type="text" options={[ "", "Yes", "No" ]}/>
        <ReadOnlyDataRenderer model={ model } name="severity_reason" label="Reason for Seriousness"  type="text" options={ SEVERITY_REASON }/>
        <ReadOnlyDataRenderer model={ model } name="medical_history" label="Relevant medical history" type="text" />
        <ReadOnlyDataRenderer model={ model } name="past_drug_therapy" label="Relevant Past Drug Therapy" type="text"/>
        <ReadOnlyDataRenderer model={ model } name="lab_test_results" label="Laboratory test results" type="text"/>

        <Text style={ AppStyles.boldText }>Current Medication (Including OTC and herbals)</Text>
        <MedicationTableComponent model={ model } name="sadr_list_of_drugs" readonly={ true }/>
        <ConcomitantTableComponent model={ model } name="sadr_other_drugs" label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken:" readonly={ true }/>
        <ReadOnlyDataRenderer model={ model } label="Action taken:" name="action_taken" required={ true } options={ ACTION_TAKEN } type="option"/>
        <ReadOnlyDataRenderer model={ model } name="outcome" label="Outcome of ADR:" options={ OUTCOME } type="option"/>
        <ReadOnlyDataRenderer model={ model } name="relatedness" label="Relatedness of suspected medicine(s) to ADR:" options={ RELATEDNESS_TO_ADR } type="option"/>
        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files" readonly={ true }/>

        <ReadOnlyDataRenderer model={ model } name="reporter_name" label="Forename(s) and Surname: "  type="text"/>
        <ReadOnlyDataRenderer model={ model } name="designation_id" label="Designation: " options={ DESIGNATION }  type="option"/>
        <ReadOnlyDataRenderer model={ model } name="reporter_email" label="Email Address: " keyboardType = 'email-address'  type="text"/>
        <ReadOnlyDataRenderer model={ model } name="reporter_phone" label="Phone number" keyboardType = 'phone-pad'  type="text"/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => goBack() } title="Close"/>
        </View>
      </ScrollView>
    )
  }
  // <Button title="Edit"/> <ConcomitantTableComponent model={ model } name="sadr_other_drugs" label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken:"/>
  // <MedicationTableComponent model={ model } name="sadr_list_of_drugs"/>
  //<FileAttachmentComponent model={ model } name="files" label="Attach any files"/>
}
