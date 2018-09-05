import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import SAEDrugsTableComponent from '../components/SAEDrugsTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import SAEConcomitantTableComponent from '../components/SAEConcomitantTableComponent'
import LabsTableComponent from '../components/LabsTableComponent'

import AppStyles from '../../styles/AppStyles'

import { SEVERITY_REASON, OUTCOME, ACTION_TAKEN, RELATEDNESS_TO_ADR, DESIGNATION, REPORT_TYPE_SAE, BOOLEAN_NA_OPTIONS,
 SAE_TOXICITY_GRADE, EVENT_TYPE, SAE_EVENT_TYPE, BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, LOCATION_ADVERSE_EVENT,
 RESEARCH_INVOLVES
 } from '../../utils/FieldOptions'

import { REPORT_TYPE_SAE_FOLLOW_UP } from "../../utils/Constants"

export default class SAEReadOnly extends Component{
  //
  render() {
    const { model, goBack, createFollowup } = this.props
    const newFollowUp = { rid : Date.now(), "type": REPORT_TYPE_SAE_FOLLOW_UP, parent_reference : model.reference_number, report_type : "FollowUp" }
    const followUpBtn = model.reference_number != null ? (<Button onPress={ () => createFollowup(newFollowUp, 'SAEFollowupScene') } title="Create Followup report"/>) : null
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>
        <ReadOnlyDataRenderer label="MCAZ Reference Number" name="reference_number" model={ model }/>
        <ReadOnlyDataRenderer label="MRCZ Protocol #:" name="mrcz_protocol_number" model={ model }/>
        <ReadOnlyDataRenderer label="MCAZ Protocol #"  name="mraz_protocol_number"model={ model }/>
        <ReadOnlyDataRenderer label="Institution"  name="name_of_institution" model={ model }/>
        <ReadOnlyDataRenderer label="Principle Investigator:"  name="principal_investigator" model={ model }/>
        <ReadOnlyDataRenderer label="Phone:" keyboardType = 'phone-pad' name="reporter_phone" model={ model }/>
        <ReadOnlyDataRenderer label="Email:" keyboardType = 'email-address' name="reporter_email" model={ model }/>
        <ReadOnlyDataRenderer label="Report prepared by:" name="reporter_name" model={ model }/>
        <ReadOnlyDataRenderer label="Designation in the study:" name="designation_id" model={ model } type="option" options={ DESIGNATION }/>
        <ReadOnlyDataRenderer label="Study Title:" name="study_title" model={ model }/>
        <ReadOnlyDataRenderer label="Study Sponsor:" name="study_sponsor" model={ model }/>
        <ReadOnlyDataRenderer label="Date of Adverse Event:" name="date_of_adverse_event" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Date of Site Awareness:" name="date_of_site_awareness" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Participant ID:" name="participant_number" model={ model }/>
        <ReadOnlyDataRenderer label="Hosp. Num.:" name="institution_code" model={ model }/>
        <ReadOnlyDataRenderer label="Date of Birth:" name="date_of_birth" model={ model } type="date"/>
        <ReadOnlyDataRenderer label="Gender :" name="gender" model={ model } options={['Male', 'Female', 'Unknown']}/>
        <ReadOnlyDataRenderer label="Type of Report" name="report_type" model={ model } type="option" options={ REPORT_TYPE_SAE }/>
        <ReadOnlyDataRenderer label="Study week" name="study_week" model={ model }/>
        <ReadOnlyDataRenderer label="Visit number" name="visit_number" model={ model }/>

        <ReadOnlyDataRenderer label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } type="option" options={ EVENT_TYPE }/>
        <ReadOnlyDataRenderer label="2a. If SAE, is it:" name="sae_type" model={ model } type="option" options={ SAE_EVENT_TYPE }/>
        <ReadOnlyDataRenderer label="If Other, specify" name="sae_description" model={ model }/>
        <ReadOnlyDataRenderer label="2b. Toxicity Grade" name="toxicity_grade" model={ model } type="option" options={ SAE_TOXICITY_GRADE }/>
        <ReadOnlyDataRenderer label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } options={["Yes", "No"]}/>
        <ReadOnlyDataRenderer label="If yes, how many?" name="previous_events_number" keyboardType="numeric" model={ model }/>
        <ReadOnlyDataRenderer label="3b. Total Number of SAEs to date for the whole study:" keyboardType="numeric" name="total_saes" model={ model } />
        <ReadOnlyDataRenderer label="4. Location of the current Adverse Event:" name="location_event" model={ model } type="option" options={ LOCATION_ADVERSE_EVENT }/>
        <ReadOnlyDataRenderer label="If Other, specify" name="location_event_specify" model={ model }/>
        <ReadOnlyDataRenderer label="5. Research involves a" name="research_involves" model={ model } type="option" options={ RESEARCH_INVOLVES }/>
        <ReadOnlyDataRenderer label="If Other, specify" name="research_involves_specify" model={ model }/>
        <ReadOnlyDataRenderer label="6. Name of Drug, Device or Procedure:" name="name_of_drug" model={ model }/>
        <ReadOnlyDataRenderer label="7. Is the drug/device investigational:" name="drug_investigational" model={ model } options={["Yes", "No"]}/>

        <Text>8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
            their relationship to the SAE:</Text>
        <SAEDrugsTableComponent model={ model } name="adr_list_of_drugs" readonly={ true }/>
        <ReadOnlyDataRenderer label="9. Was the patient taking any other drug at the time of onset of the AE?" model={ model } name="patient_other_drug" options={["Yes", "No"]}/>
        <Text>10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the
            relationship to the SAE:</Text>
        <SAEConcomitantTableComponent model={ model } name="adr_other_drugs" readonly={ true }/>
        <Text>11. Has the Adverse Event been
            reported to:</Text>
        <ReadOnlyDataRenderer label="(a) MCAZ" model={ model } name="report_to_mcaz" options={["Yes", "No"]}/>
        <ReadOnlyDataRenderer label="Date" model={ model } name="report_to_mcaz_date" type="date"/>
        <ReadOnlyDataRenderer label="(b) MRCZ" model={ model } name="report_to_mrcz" options={["Yes", "No"]}/>
        <ReadOnlyDataRenderer label="Date" model={ model } name="report_to_mrcz_date" type="date"/>
        <ReadOnlyDataRenderer label="(c) Sponsor" model={ model } name="report_to_sponsor" options={["Yes", "No"]}/>
        <ReadOnlyDataRenderer label="Date" model={ model } name="report_to_sponsor_date" type="date"/>
        <ReadOnlyDataRenderer label="(d) IRB" model={ model } name="report_to_irb" options={["Yes", "No"]}/>
        <ReadOnlyDataRenderer label="Date" model={ model } name="report_to_irb_date" type="date"/>

        <Text>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
            results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
            results of abnormal investigations and a hospital discharge letter may be attached:</Text>
        <ReadOnlyDataRenderer label="Summary of relevant past medical history of participant" multiline = {true}
            numberOfLines = {4} model={ model } name="medical_history"/>
        <ReadOnlyDataRenderer label="(a) Diagnosis" multiline = {true}
            numberOfLines = {4} model={ model } name="diagnosis"/>
        <ReadOnlyDataRenderer label="(b) Immediate Cause" multiline = {true}
            numberOfLines = {4} model={ model } name="immediate_cause"/>
        <ReadOnlyDataRenderer label="(c) Symptoms" multiline = {true}
            numberOfLines = {4} model={ model } name="symptoms"/>
        <ReadOnlyDataRenderer label="(d) Investigations-Laboratory and any other significant
            investigations conducted:" multiline = {true} model={ model } name="investigations"
            numberOfLines = {4}/>
        <LabsTableComponent model={ model } name="adr_lab_tests" readonly={ true }/>
        <ReadOnlyDataRenderer label="(e) Results:" multiline = {true} model={ model } name="results"
            numberOfLines = {4}/>
        <ReadOnlyDataRenderer label="(f) Management (Include management of study treatment, continued,
              temporarily held, reduced dose, permanent discontinuation, off Product):" multiline = {true}
            numberOfLines = {4} model={ model } name="management"/>
        <ReadOnlyDataRenderer type="option" label="(g) Outcome:" multiline = {true} model={ model } name="outcome"
            numberOfLines = {4} options={ OUTCOME }/>
        <Text>NB If the outcome is death, please complete &amp; attach the death form.</Text>

        <ReadOnlyDataRenderer label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" model={ model } name="d1_consent_form" options={ BOOLEAN_NA_OPTIONS }/>
        <ReadOnlyDataRenderer label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" model={ model } name="d2_brochure" options={ BOOLEAN_NA_OPTIONS }/>
        <ReadOnlyDataRenderer label="D3. Are changes required to the protocol as a result of this SAE?" model={ model } name="d3_changes_sae" options={ BOOLEAN_NA_OPTIONS }/>
        <ReadOnlyDataRenderer label="D4. Are changes required to the consent form as a result of this SAE?" model={ model } name="d4_consent_sae" options={ BOOLEAN_NA_OPTIONS }/>
        <FileAttachmentComponent model={ model } name="files" label="Attach any files" readonly={ true }/>
        <Text>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</Text>
        <ReadOnlyDataRenderer label="If changes are not required, please explain as to why changes to the protocol /consent
            form are not necessary based on the event." multiline = {true} numberOfLines = {4} model={ model } name="changes_explain"/>

        <ReadOnlyDataRenderer label="From the data obtained or from currently available information, do you see any need to reassess the
            risks and benefits to the subjects in this research." model={ model } name="assess_risk" options={ ["Yes", "No"] }/>
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
