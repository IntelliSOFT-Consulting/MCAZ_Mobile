import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'
import ReadOnlyDataRenderer from '../components/ReadOnlyDataRenderer'
import VaccineDosesTableComponent from '../components/VaccineDosesTableComponent'
import VaccineTableComponent from '../components/VaccineTableComponent';
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import moment from 'moment';

import AppStyles from '../../styles/AppStyles'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, STATUS_ON_DATE, DESIGNATION, INFANT_BIRTH_OPTS, MULTI_VIALS, DELIVERY_OPTS, SOURCE_INFO, RESEARCH_INVOLVES, BOOLEAN_NA_OPTIONS,
  WHEN_VACCINATED, SYRINGES_USED, PLACE_VACCINATION, SITE_TYPE, VACCINATION_IN, BOOLEAN_UNABLE_OPTIONS, EVENT_TYPE, SAE_EVENT_TYPE, SAE_TOXICITY_GRADE, LOCATION_ADVERSE_EVENT, PROVINCES, AGE_GROUP_YEARS } from '../../utils/FieldOptions'
import { REPORT_TYPE_AEFI_INV_FOLLOW_UP } from '../../utils/Constants';

export default class AEFIInvReadOnly extends Component{
  // <ReadOnlyDataRenderer label="MCAZ Reference Number (MCAZ use only)"/>
  constructor(props, context) {
    super(props, context)
    var { model } = this.props
    if(model.reports == null) {
      model.reports = [{}]
    }
    this.state = { model : model }
  }
  render() {
    const { goBack, createFollowup } = this.props
    const { model } = this.state
    // deep copy json object
    const nm = JSON.parse(JSON.stringify(model));
    const newFollowUp = {...nm, rid : Date.now(), "type": REPORT_TYPE_AEFI_INV_FOLLOW_UP, report_type : "Followup" }
    if (newFollowUp['symptom_date']) {
      newFollowUp['symptom_date'] = moment(newFollowUp['symptom_date']).format('DD-MM-YYYY');
    }
    if (newFollowUp['hospitalization_date']) {
      newFollowUp['hospitalization_date'] = moment(newFollowUp['hospitalization_date']).format('DD-MM-YYYY');
    }
    const followUpBtn = model.reference_number != null ? (<Button onPress={ () => createFollowup(newFollowUp, 'AEFIInvFormScene') } title="Create Followup report"/>) : null
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.aefiBackground ] }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>
        <ReadOnlyDataRenderer type="option" label="Province:" name="province_id" model={ model } options={ PROVINCES }/>
        <ReadOnlyDataRenderer label="District:" name="district" model={ model }/>
        <ReadOnlyDataRenderer label="AEFI Report ID" name="aefi_report_ref" model={ model }/>
        <ReadOnlyDataRenderer type="text"  label="Name of vaccination site " model={ model } name="name_of_vaccination_site" />
        <ReadOnlyDataRenderer type="option"  label="Place of vaccination:" model={ model } name="place_vaccination" options={ PLACE_VACCINATION }/>
        <ReadOnlyDataRenderer type="text"  label="If other, specify" model={ model } name="place_vaccination_other" />
        <ReadOnlyDataRenderer type="option"  label="Type of site" model={ model } name="site_type" options={ SITE_TYPE }/>
        <ReadOnlyDataRenderer type="text"  label="If other, specify" model={ model } name="site_type_other" />
        <ReadOnlyDataRenderer type="option"  label="Vaccination in" model={ model } name="vaccination_in" options={ VACCINATION_IN }/>
        <ReadOnlyDataRenderer type="text"  label="If other, specify" model={ model } name="vaccination_in_other" />
        <ReadOnlyDataRenderer type="text"  label="Name of Investigating Health Worker:" model={ model } name="reporter_name"/>
        <ReadOnlyDataRenderer type="option"  label="Designation / Position:" model={ model } name="designation_id" options={ DESIGNATION }/>
        <ReadOnlyDataRenderer type="text"  label="Telephone # landline (with code):" keyboardType = 'phone-pad' model={ model } name="telephone"/>
        <ReadOnlyDataRenderer type="text"  label="Mobile:" keyboardType = 'phone-pad' model={ model } name="mobile"/>
        <ReadOnlyDataRenderer type="text"  label="Email:" keyboardType = 'email-address' model={ model } name="reporter_email"/>
        <ReadOnlyDataRenderer type="date"  label="Date AEFI reported:" model={ model } name="report_date"/>
        <ReadOnlyDataRenderer type="date"  label="Date investigation started:" model={ model } name="start_date"/>
        <ReadOnlyDataRenderer type="date"  label="Date investigation completed:" model={ model } name="complete_date" />
        <ReadOnlyDataRenderer type="text"  label="Patient Name:" model={ model } name="patient_name"/>
        <ReadOnlyDataRenderer type="option"  label="Gender:" model={ model } name="gender" options={ GENDER }/>
        <ReadOnlyDataRenderer label="Patient’s physical address" model={ model } name="patient_address"/>
        <ReadOnlyDataRenderer type="date" label="Date of birth (DD/MM/YYYY):" name="date_of_birth" model={ model } required={ true } maxDate={ new Date() } onDateChange={ this.validateDateofBirth } value={ this.state.date_of_birth }/>
        <ReadOnlyDataRenderer label="OR Age at onset" name="age_at_onset" model={ model } value={ this.state.age_at_onset } onChange={ this.validateAge }/>
        <ReadOnlyDataRenderer type="option" label="OR Age group:" model={ model } name="age_group" options={ AGE_GROUP_YEARS }/>
        <Text>*Complete below table if vaccination information missing on the AEFI reporting form</Text>
        <Text style={ AppStyles.boldText }>Vaccine/Dilutent</Text>
        <VaccineTableComponent model={ model } name="saefi_list_of_vaccines" label="Vaccine" readonly={ true }/>

        <ReadOnlyDataRenderer type="date" label="Date of first/key symptom (DD/MM/YYYY)" model={ model } name="hospitalization_date" maxDate={ new Date() } showTime={ true }/>
        <ReadOnlyDataRenderer type="date"  label="Date of hospitalization (DD/MM/YYYY):" model={ model } name="hospitalization_date"/>
        <ReadOnlyDataRenderer type="option"  label="Status on the date of investigation:" model={ model } name="status_on_date" options={ STATUS_ON_DATE }/>
        <ReadOnlyDataRenderer type="date"  label="If died, date and time of death:" model={ model } name="died_date"/>
        <ReadOnlyDataRenderer type="option"  label="Autopsy done?" model={ model } name="autopsy_done" options={ BOOLEAN_OPTIONS }/>
        <ReadOnlyDataRenderer type="date"  label="Date:" model={ model } name="autopsy_done_date"/>
        <ReadOnlyDataRenderer type="option"  label="Autopsy planned?" model={ model } name="autopsy_planned" options={ BOOLEAN_OPTIONS }/>
        <ReadOnlyDataRenderer type="date"  label="Planned on Date:" model={ model } name="autopsy_planned_date"/>
        <ReadOnlyDataRenderer name="reports" model={ model.reports } label="Attach report" type="file"/>

        <ReadOnlyDataRenderer type="option"  label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } validate={ this.state.validate } required={ true } options={ EVENT_TYPE }/>
        <ReadOnlyDataRenderer type="option"  label="2a. If SAE, is it:" name="sae_type" model={ model } validate={ this.state.validate } required={ true } options={ SAE_EVENT_TYPE }/>
        <ReadOnlyDataRenderer type="text"  label="If Other, specify" name="sae_description" model={ model } validate={ this.state.validate } required={ true }/>
        <ReadOnlyDataRenderer type="option"  label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } validate={ this.state.validate } required={ true } options={ SAE_TOXICITY_GRADE }/>
        <ReadOnlyDataRenderer type="option"  label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS }/>
        <ReadOnlyDataRenderer type="text"  label="If yes, how many?" name="previous_events_number" keyboardType="numeric" model={ model } validate={ this.state.validate } required={ true }/>
        <ReadOnlyDataRenderer type="text"  label="3b. Total Number of SAEs to date for the whole study:" keyboardType="numeric" name="total_saes" model={ model } validate={ this.state.validate } required={ true } />
        <ReadOnlyDataRenderer type="option"  label="4. Location of the current Adverse Event:" name="location_event" model={ model } validate={ this.state.validate } required={ true } options={ LOCATION_ADVERSE_EVENT }/>
        <ReadOnlyDataRenderer type="text"  label="If Other, specify" name="location_event_specify" model={ model } validate={ this.state.validate } required={ true }/>
        <ReadOnlyDataRenderer type="option"  label="5. Research involves a:" name="research_involves" model={ model } validate={ this.state.validate } required={ true } options={ RESEARCH_INVOLVES }/>
        <ReadOnlyDataRenderer type="text"  label="If Other, specify" name="research_involves_specify" model={ model } validate={ this.state.validate } required={ true }/>
        <ReadOnlyDataRenderer type="text"  label="6. Name of Drug, Device or Procedure:" name="name_of_drug" model={ model } validate={ this.state.validate } required={ true }/>
        <ReadOnlyDataRenderer type="option"  label="7. Is the drug/device investigational:" name="drug_investigational" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS }/>

        <ReadOnlyDataRenderer type="option"  label="Source of information" model={ model } name="source_examination" options={ SOURCE_INFO }/>
        <ReadOnlyDataRenderer type="text"  label="Other" model={ model } name="source_other_specify"/>
        <ReadOnlyDataRenderer type="text"  label="If from verbal autopsy, please mention source" model={ model } name="verbal_source"/>
        <ReadOnlyDataRenderer type="text"  label="Name of the person who first examined/treated the patient:" model={ model } name="examiner_name"/>
        <ReadOnlyDataRenderer type="text"  label="Other sources who provided information (specify):" model={ model } name="other_sources"/>
        <ReadOnlyDataRenderer type="text"  label="Signs and symptoms in chronological order from the time of vaccination:" model={ model } name="signs_symptoms" />
        <ReadOnlyDataRenderer type="text"  label="Name and contact information of person completing these clinical details:" model={ model } name="person_details"/>
        <ReadOnlyDataRenderer type="text"  label="Designation:" model={ model } name="person_designation"/>
        <ReadOnlyDataRenderer type="text"  label="Date/time" model={ model } name="person_date"/>
        <Text style={ AppStyles.boldText }>
            **Instructions – Attach copies of ALL available documents (including case sheet, discharge summary, case notes,
            laboratory reports and autopsy reports) and then complete additional information NOT AVAILABLE in
            existing documents, i.e.
        </Text>
        <Text>If patient has received medical care  attach copies of all available documents (including case sheet, discharge
            summary, laboratory reports and autopsy reports, if available) and write only the information that is not
            available in the attached documents below
        </Text>
        <ReadOnlyDataRenderer type="text"  label="" model={ model } name="medical_care"/>
        <Text>
            If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
            additional sheets if necessary)
        </Text>
        <ReadOnlyDataRenderer type="text"  label="" model={ model } name="not_medical_care"/>
        <FileAttachmentComponent model={ model } name="attachments" readonly={ true }/>
        <ReadOnlyDataRenderer type="text"  label="Provisional / Final diagnosis:" model={ model } name="final_diagnosis"/>

        <Text>
          Number vaccinated for each antigen at session site. Attach record if available.
        </Text>
        <VaccineDosesTableComponent model={ model } name="saefi_list_of_vaccines" readonly={ true }/>
        <ReadOnlyDataRenderer type="option"  label="(a) When was the patient vaccinated?" model={ model } name="when_vaccinated" options={ WHEN_VACCINATED }/>
        <ReadOnlyDataRenderer type="option"  label="In case of multidose vials, was the vaccine given" model={ model } name="when_vaccinated" options={ WHEN_VACCINATED }/>
        <ReadOnlyDataRenderer type="text"  label="Specify" model={ model } name="when_vaccinated_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="prescribing_error" options={ BOOLEAN_UNABLE_OPTIONS } label="(b) Was there an error in prescribing or non-adherence to recommendations for use of this vaccine?" />
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="prescribing_error_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_unsterile" options={ BOOLEAN_UNABLE_OPTIONS } label="(c) Based on your investigation, do you feel that the vaccine (ingredients) administered could have been unsterile?" />
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="vaccine_unsterile_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_condition" options={ BOOLEAN_UNABLE_OPTIONS } label="(d) Based on your investigation, do you feel that the vaccine&#39;s physical condition (e.g. colour, turbidity, foreign substances etc.) was abnormal at the time of administration?"/>
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="vaccine_condition_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_reconstitution" options={ BOOLEAN_UNABLE_OPTIONS } label="(e) Based on your investigation, do you feel that there was an error in vaccine
          reconstitution/preparation by the vaccinator (e.g. wrong product, wrong diluent, improper mixing,
          improper syringe filling etc.)?"/>
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="vaccine_reconstitution_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_handling" options={ BOOLEAN_UNABLE_OPTIONS } label="(f) Based on your investigation, do you feel that there was an error in vaccine handling (e.g. cold
          chain failure during transport, storage and/or immunization session etc.)?"/>
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="vaccine_handling_specify"/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_administered" options={ BOOLEAN_UNABLE_OPTIONS } label="(g) Based on your investigation, do you feel that the vaccine was administered incorrectly (e.g. wrong
          dose, site or route of administration, wrong needle size, not following good injection practice etc.)?"/>
        <ReadOnlyDataRenderer type="text"  label="Remarks" model={ model } name="vaccine_administered_specify"/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_vial" label="(h) Number vaccinated from the concerned vaccine vial/ampoule" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_session" label="(i) Number vaccinated with the concerned vaccine in the same session" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_locations" label="(j) Number vaccinated with the concerned vaccine having the same batch number in other locations."
          />
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_locations_specify" label="Specify locations:" />
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccinated_cluster" options={ BOOLEAN_UNKNOWN_OPTIONS } label="(k) Is this case a part of a cluster?" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_cluster_number" label=" If yes, how many other cases have been detected in the cluster?" />
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccinated_cluster_vial" options={ BOOLEAN_UNKNOWN_OPTIONS } label="a. Did all the cases in the cluster receive vaccine from the same vial?" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="vaccinated_cluster_vial_number" label="b. If no, number of vials used in the cluster (enter details separately)" />

        <Text>(Complete this section by asking and/or observing practice)</Text>

        <Text>Syringes and needles used:</Text>
        <ReadOnlyDataRenderer type="option"  label="Are AD syringes used for immunization?" model={ model } name="syringes_used" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <ReadOnlyDataRenderer type="option"  label="If no, specify the type of syringes used:" model={ model } name="syringes_used_specify" options={ SYRINGES_USED }/>
        <ReadOnlyDataRenderer type="text"  label="Other" model={ model } name="syringes_used_other"/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="syringes_used_findings" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Reconstitution: (complete only if applicable,  NA if not applicable)</Text>
        <Text>Reconstitution procedure ()</Text>
        <ReadOnlyDataRenderer type="option"  model={ model } name="reconstitution_multiple" options={ BOOLEAN_NA_OPTIONS } label="Same reconstitution syringe used for multiple vials of same vaccine?" />
        <ReadOnlyDataRenderer type="option"  model={ model } name="reconstitution_different" options={ BOOLEAN_NA_OPTIONS } label="Same reconstitution syringe used for reconstituting different vaccines?" />
        <ReadOnlyDataRenderer type="option"  model={ model } name="reconstitution_vial" options={ BOOLEAN_NA_OPTIONS } label="Separate reconstitution syringe for each vaccine vial?" />
        <ReadOnlyDataRenderer type="option"  model={ model } name="reconstitution_syringe" options={ BOOLEAN_NA_OPTIONS } label="Separate reconstitution syringe for each vaccination?" />

        <ReadOnlyDataRenderer type="option"  model={ model } name="reconstitution_vaccines" options={ BOOLEAN_NA_OPTIONS } label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="reconstitution_observations" multiline={ true } label="Specific key findings/additional observations and comments:" multiline = {true} numberOfLines = {4}/>

        <Text>(Complete this section by asking and/or observing practice)</Text>
        <Text>Last vaccine storage point:</Text>
        <ReadOnlyDataRenderer type="option"  model={ model } name="cold_temperature" options={ BOOLEAN_OPTIONS } label="Is the temperature of the vaccine storage refrigerator monitored?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="cold_temperature_deviation" options={ BOOLEAN_OPTIONS } label="If “yes”, was there any deviation outside of 2-8 ° C after the vaccine was placed inside?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="cold_temperature_specify" label="If “yes”, provide details of monitoring separately."/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="procedure_followed" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was the correct procedure for storing vaccines, diluents and syringes followed?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="other_items" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="partial_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any partially used reconstituted vaccines in the refrigerator?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="unusable_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="unusable_diluents" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="additional_observations" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Vaccine transportation from the refrigerator to the vaccination centre:</Text>
        <ReadOnlyDataRenderer type="option"  model={ model } name="cold_transportation" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was cold chain properly maintained during transportation?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="vaccine_carrier" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was the vaccine carrier sent to the site on the same day as vaccination?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="option"  model={ model } name="coolant_packs" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were conditioned coolant-packs used?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="transport_findings" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>

        <ReadOnlyDataRenderer type="option"  model={ model } name="similar_events" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" options={ ["Yes", "No"] }/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="similar_events_describe" label="If yes, describe:" multiline={true} numberOfLines={4}/>
        <ReadOnlyDataRenderer type="text"  model={ model } name="similar_events_episodes" label="If yes, how many events/episodes?" multiline={true} numberOfLines={4}/>
        <Text>Of those affected, how many are </Text>
        <ReadOnlyDataRenderer type="text"  model={ model } name="affected_vaccinated" label="Vaccinated:" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="affected_not_vaccinated" label="Not vaccinated:" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="affected_unknown" label="Unknown:" />
        <ReadOnlyDataRenderer type="text"  model={ model } name="community_comments" label="Other comments:" multiline={true} numberOfLines={4}/>

        <ReadOnlyDataRenderer type="text"  name="relevant_findings" label="Other relevant findings/observations/comments" multiline={true} numberOfLines={4} model={ model }/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => goBack() } title="Close"/>
          {followUpBtn}
        </View>
      </ScrollView>
    )
  }
  // <Button title="Edit"/> <ConcomitantTableComponent model={ model } name="sadr_other_drugs" label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken:"/>
  // <MedicationTableComponent model={ model } name="sadr_list_of_drugs"/>
  //<FileAttachmentComponent model={ model } name="files" label="Attach any files"/>
}
