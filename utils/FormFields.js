export const SAE_MANDATORY_FIELS  = [
  { name : "mrcz_protocol_number", text : "MCRZ Protocol #", page : 1 },
  { name : "name_of_institution", text: "Name of Institution", page : 1},
  { name : "mcaz_protocol_number", text : "MCAZ Protocol #", page : 1 },
  { name : "principal_investigator", text : "Principal Investigator", page : 2 },
  { name : 'reporter_phone', text : "Phone", page : 2},
  { name : "reporter_name", text : "Report prepared by", page : 2 }, { name : "reporter_email", text : "Email", page : 3 },
  { name : 'designation_id', text : "Designation", page : 3 },
  //{ name : 'designation_id', text : "Date Form completed", page : 3 },
  { name : 'study_title', text : "Study title", page : 3 },
  { name : 'study_sponsor', text : "Study sponsor", page : 3 },
  { name : 'date_of_adverse_event', text : "Date of Adverse Event:", page : 3 },
  { name : 'participant_number', text : "Participant ID", page : 3 },
  { name : 'institution_code', text : "Hosp. Num", page : 3 },
  { name : 'report_type', text : "Type of Report", page : 3 },
  { name : 'date_of_site_awareness', text : "Date of site Awareness", page : 3 },
  { name : 'date_of_birth', text : "Date of birth", page : 3 },
  { name : 'gender', text : "Gender", page : 3 },
  { name : 'study_week', text : "Study week", page : 3 },
  { name : 'visit_number', text : "Visit number", page : 3 },
  { name : 'adverse_event_type', text : "1. What type of adverse event is this?", page : 3 },
  //{ name : 'sae_type', text : "2a. If SAE, is it", page : 3 },
  { name : 'sae_description', text : "If Other, specify", page : 3, dependent : "sae_type", value : "" },
  { name : 'toxicity_grade', text : "2b. Toxicity Grade", page : 3 },
  { name : 'previous_events', text : "3a. Any previous Adverse Event’s report on this participant?", page : 3 },
  { name : 'previous_events_number', text : "If yes, how many?", page : 3, dependent : "sae_type", value : "" },
  { name : 'total_saes', text : "3b. Total Number of SAEs to date for the whole study", page : 3 },
  { name : 'location_event', text : "4. Location of the current Adverse Event", page : 3 },
  { name : 'location_event_specify', text : "If other, specify", page : 3, dependent : "location_event", value : "" },
  { name : 'research_involves', text : "5. Research involves a", page : 3 },
  { name : 'research_involves_specify', text : "If other, specify", page : 3, dependent : "research_involves", value : "" },
  { name : 'name_of_drug', text : "6. Name of Drug, Device or Procedure", page : 3 },
  { name : 'drug_investigational', text : "7. Is the drug/device investigational", page : 3 },
  { name : "adr_list_of_drugs", page : 3, fields: [{ name : "drug_name", text : "Drug/Device/Vaccine", page : 3 }, { name: "dosage", text: "Dose", page : 3}, { name : "dose_id", text : "Dose", page : 3 },
    { name : "route_id", text : "Route", page : 3 }, { name : "frequency_id", text : "Frequency", page : 3 }, { name : "start_date", text : "Start commenced", page : 3 },
    { name : "taking_drug", text: "Taking drug at onset of SAE?", page : 3 }, { name: "relationship_to_sae", text : 'Relationship of SAE to drug', page : 3}]},
  { name : 'patient_other_drug', text : "9. Was the patient taking any other drug at the time of onset of the AE?", page : 3 },
  { name : "adr_other_drugs", page : 3, fields: [{ name : "drug_name", text : "Name of drug" }, { name : "start_date", text : "Date started" },
    { name : "stop_date", text : "Date stopped" }, { name : "relationship_to_sae", text : "Relationship of SAE to medication" }]},
  { name : 'report_to_mcaz', text : "11. Has the Adverse Event been reported to MCAZ", page : 3 },
  { name : 'report_to_mcaz_date', text : "11. Has the Adverse Event been reported to MCRZ > Date", page : 3, dependent : "report_to_mcaz", value : "Yes" },
  { name : 'report_to_mrcz', text : "11. Has the Adverse Event been reported to MCAZ", page : 3 },
  { name : 'report_to_mrcz_date', text : "11. Has the Adverse Event been reported to MCRZ > Date", page : 3, dependent : "report_to_mrcz", value : "Yes" },
  { name : 'report_to_sponsor', text : "11. Has the Adverse Event been reported to Sponsor", page : 3 },
  { name : 'report_to_sponsor_date', text : "11. Has the Adverse Event been reported to Sponsor > Date", page : 3, dependent : "report_to_sponsor", value : "Yes" },
  { name : 'report_to_irb', text : "11. Has the Adverse Event been reported to IRB", page : 3 },
  { name : 'report_to_irb_date', text : "11. Has the Adverse Event been reported to IRB > Date", page : 3, dependent : "report_to_irb", value : "Yes" },
  { name : 'medical_history', text : "Summary of relevant past medical history of participant", page : 3 },
  { name : 'diagnosis', text : "(a) Diagnosis", page : 3 },
  { name : 'immediate_cause', text : "(b) Immediate Cause", page : 3 },
  { name : 'symptoms', text : "(c) Symptoms", page : 3 },
  { name : 'investigations', text : "(d) Investigations-Laboratory and any other significant investigations conducted", page : 3 },

  { name : "adr_lab_tests", page : 3, fields: [{ name : "lab_test", text : "Lab test" }, { name : "abnormal_result", text : "Abnormal Result" },
    { name : "site_normal_range", text : "Site Normal Range" }, { name : "collection_date", text : "Collection date" },
  { name : "lab_value", text : "Lab value previous or subsequent to this event" }, { name : "lab_value_date", text : "Collection date" }]},

  { name : 'results', text : "(e) Results", page : 3 },
  { name : 'management', text : "(f) Management (Include management of study treatment, continued, temporarily held, reduced dose, permanent discontinuation, off Product)", page : 3 },
  { name : 'outcome', text : "(g) Outcome", page : 3 },
  { name : 'd1_consent_form', text : "D1. Was this Adverse Event originally addressed in the protocol and consent form?", page : 3 },
  { name : 'd2_brochure', text : "D2. Was this Adverse Event originally addressed in Investigators Brochure?", page : 3 },
  { name : 'd3_changes_sae', text : "D3. Are changes required to the protocol as a result of this SAE?", page : 3 },
  { name : 'd4_consent_sae', text : "D4. Are changes required to the consent form as a result of this SAE?", page : 3 },
  { name : 'changes_explain', text : "If changes are not required, please explain as to why changes to the protocol /consent form are not necessary based on the event", page : 3, dependent : "d3_changes_sae", value : "No" },
  { name : 'assess_risk', text : "From the data obtained or from currently available information, do you see any need to reassess the risks and benefits to the subjects in this research", page : 3 },

]

export const AEFI_MANDATORY_FIELS  = [
  { name : "patient_name", text : "Patient name", page : 1 },
  { name : "patient_address", text: "Patient Address", page : 1},
  { name : "date_of_birth", text : "Date of birth", page : 1, dependent: "age_at_onset", value: "" },
  { name : "age_at_onset_years", text : "Age on onset - Years", page : 1, dependent: "date_of_birth", value : "" },
  { name : "age_at_onset_months", text : "Age on onset - Months", page : 1, dependent: "date_of_birth", value : "" },
  { name : "age_at_onset_days", text : "Age on onset - Days", page : 1, dependent: "date_of_birth", value : "" },
  { name : "age_at_onset_specify", text : "Age on onset", page : 1, dependent: "date_of_birth", value : "" },
  { name : "reporter_name", text : "Reporter’s Name", page : 1 },
  { name : 'adverse_events', text : "Adverse event", page : 2},
  { name : "serious", text : "Serious", page : 2 },
  { name : "outcome", text : "Outcome", page : 3 },
]

export const AEFI_FOLLOW_UP_MANDATORY_FIELDS  = [
  { name : 'adverse_events', text : "Adverse event", page : 2 }
]
