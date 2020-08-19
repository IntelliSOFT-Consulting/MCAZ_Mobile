export const SEVERITY_REASON = [ { key: "", value: "select one" },
  { key : 'Death', value : 'Death'}, { key : 'Life-threatening', value : 'Life-threatening'},
  { key : 'Hospitalization/Prolonged', value : 'Hospitalization/Prolonged'},
  { key : 'Disabling', value : 'Disabling'}, { key : 'Congenital-anomaly', value : 'Congenital-anomaly'},
  { key : 'Other Medically Important Reason', value : 'Other Medically Important Reason'}
]

export const OUTCOME = [ { key : "", value: "select one"},
  { key : 'Recovered', value : 'Recovered'}, { key : 'Recovering', value : 'Recovering'},
  { key : 'Not yet recovered', value : 'Not yet recovered'},
  { key : 'Fatal', value : 'Fatal'}, { key : 'Unknown', value : 'Unknown'}
]

export const DOSE = [
    { "key": "1", value: "" },
    { "key": "2",
      "value": "mg"
    },
    {
      "key": "3",
      "value": "ml"
    },
    {
      "key": "4",
      "value": "µg"
    },
    {
      "key": "5",
      "value": "g"
    },
    {
      "key": "6",
      "value": "Iu"
    },
    {
      "key": "7",
      "value": "DF dosage form"
    },
    {
      "key": "8",
      "value": "Gtt drop(s)"
    },
    {
      "key": "9",
      "value": "mmol"
    },
    {
      "key": "10",
      "value": "meq"
    },
    {
      "key": "11",
      "value": "%"
    },
    {
      "key": "12",
      "value": "µCi"
    },
    {
      "key": "13",
      "value": "µg/kg"
    },
    {
      "key": "14",
      "value": "µg/m2"
    },
    {
      "key": "15",
      "value": "µl"
    },
    {
      "key": "16",
      "value": "µmol"
    },
    {
      "key": "17",
      "value": "Bq"
    },
    {
      "key": "18",
      "value": "Ci curie(s)"
    },
    {
      "key": "19",
      "value": "GBq"
    },
    {
      "key": "20",
      "value": "iu/kg"
    },
    {
      "key": "21",
      "value": "Kbq"
    },
    {
      "key": "22",
      "value": "kg"
    },
    {
      "key": "23",
      "value": "Kiu"
    },
    {
      "key": "24",
      "value": "l"
    },
    {
      "key": "25",
      "value": "MBq"
    },
    {
      "key": "26",
      "value": "mCi"
    },
    {
      "key": "27",
      "value": "mg/kg"
    },
    {
      "key": "28",
      "value": "mg/m2"
    },
    {
      "key": "29",
      "value": "Miu"
    },
    {
      "key": "30",
      "value": "Mol"
    },
    {
      "key": "31",
      "value": "nCi"
    },
    {
      "key": "32",
      "value": "ng"
    },
    {
      "key": "33",
      "value": "pg"
    }

]

export const ROUTE = [ {"key":"1", value: ""},{"key":"2","value":"oral"},{"key":"3","value":"intravenous drip"},{"key":"4","value":"intravenous bolus"},{"key":"5","value":"subcutaneous"},{"key":"6","value":"nasal"},{"key":"7","value":"sublingual"},{"key":"8","value":"topical"},{"key":"9","value":"rectal"},{"key":"10","value":"intra-articular"},{"key":"11","value":"intrathecal"},{"key":"12","value":"intra-arterial"},{"key":"13","value":"auricular (otic)"},{"key":"14","value":"buccal"},{"key":"15","value":"cutaneous"},{"key":"16","value":"dental"},{"key":"17","value":"endocervical"},{"key":"18","value":"endosinusial"},{"key":"19","value":"endotracheal"},{"key":"20","value":"epidural"},{"key":"21","value":"extra-amniotic"},{"key":"22","value":"hemodialysis"},{"key":"23","value":"intra corpus cavernosum"},{"key":"24","value":"intra-amniotic"},{"key":"25","value":"intracardiac"},{"key":"26","value":"intracavernous"},{"key":"27","value":"intracerebral"},{"key":"28","value":"intracervical"},{"key":"29","value":"intracisternal"},{"key":"30","value":"intracorneal"},{"key":"31","value":"intracoronary"},{"key":"32","value":"intradermal"},{"key":"33","value":"intradiscal (intraspinal)"},{"key":"34","value":"intrahepatic"},{"key":"35","value":"intralesional"},{"key":"36","value":"intralymphatic"},{"key":"37","value":"intramedullar (bone marrow)"},{"key":"38","value":"intrameningeal"},{"key":"39","value":"intramuscular"},{"key":"40","value":"intraocular"},{"key":"41","value":"intrapericardial"},{"key":"42","value":"intraperitoneal"},{"key":"43","value":"intrapleural"},{"key":"44","value":"intrasynovial"},{"key":"45","value":"intrathoracic"},{"key":"46","value":"intratracheal"},{"key":"47","value":"intratumor"},{"key":"48","value":"intra-uterine"},{"key":"49","value":"intravenous (nos)"},{"key":"50","value":"intravesical"},{"key":"51","value":"iontophoresis"},{"key":"52","value":"occlusive dressing technique"},{"key":"53","value":"ophthalmic"},{"key":"54","value":"oropharingeal"},{"key":"55","value":"other"},{"key":"56","value":"parenteral"},{"key":"57","value":"periarticular"},{"key":"58","value":"perineural"},{"key":"59","value":"respiratory (inhalation)"},{"key":"60","value":"retrobulbar"},{"key":"61","value":"subdermal"},{"key":"62","value":"sunconjunctival"},{"key":"63","value":"transdermal"},{"key":"64","value":"transmammary"},{"key":"65","value":"transplacental"},{"key":"66","value":"unknown"},{"key":"67","value":"urethral"},{"key":"68","value":"vaginal"}
]

export const FREQUENCY = [{"key":"1", value: ""},{"key":"2","value":"OD (once daily)"},{"key":"3","value":"BD (twice daily)"},{"key":"4","value":"TID. (three times a day)"},{"key":"5","value":"QID|QDS (four times a day)"},{"key":"6","value":"PRN (as needed)"},{"key":"7","value":"MANE (in the morning)"},{"key":"8","value":"NOCTE (at night)"},{"key":"9","value":"STAT (immediately)"}]

export const SAE_FREQUENCY = [{"key":"1", value: ""},{"key":"2","value":"OD (once daily)"},{"key":"3","value":"BD (twice daily)"},{"key":"4","value":"TID. (three times a day)"},{"key":"5","value":"QID|QDS (four times a day)"},{"key":"6","value":"PRN (as needed)"},{"key":"7","value":"MANE (in the morning)"},{"key":"8","value":"NOCTE (at night)"},{"key":"9","value":"STAT (immediately)"},{"key":"10","value":"Weekly"},{"key":"11", "value" :"Monthly" }]

export const DESIGNATION = [ { key : "", value: ""},
  { key : "1", value: "Physician"}, { key : "2", value: "Therapist"}, { key : "3", value : "Nurse" },{ key : "4", value: "Pharmacy Technician"}, { key : "5", value: "Clinical Laboratory Technician"}, { key : "6", value: "Pharmacist"},
  { key : "7", value: "Health Information Technician"}, { key : "8", value: "Family Practitioner"}, { key : "9", value: "Dentist"}, { key : "10", value: "Occupational Therapist"}, { key : "11", value: "Ophthalmologist"}, { key : "12", value: "Veterinary surgeon"},
  { key : "13", value: "Surgeon"}, { key : "14", value: "Paediatrician"}, { key : "15", value: "Anaesthetist"}, { key : "16", value: "Optometrist"}, { key : "17", value: "Psychiatrist"},
  { key : "18", value: "Obstetrician/Gynaecologist"}, { key : "19", value: "Dispensary Assistant"}, { key : "20", value: "Doctor"}, { key : "21", value: "Patient"}, { key : "22", value: "Relative/Friend"}, { key : "23", value : 'Other Health Professionals'}
].sort((a,b) => {
  var nameA = a.value.toUpperCase(); // ignore upper and lowercase
  var nameB = b.value.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
})

export const ACTION_TAKEN = [
  { key : "", value : "select one"}, { key : "Drug withdrawn", value : "Drug withdrawn" }, { key : "Dose increased", value : "Dose increased"},
  { key : "Unknown", value : "Unknown"}, { key : "Dose reduced", value : "Dose reduced"}, { key : "Dose not changed", value : "Dose not changed"},
  { key : "Not applicable", value : "Not applicable"},{ key : "Medical treatment of ADR", value : "Medical treatment of ADR"}
]

export const RELATEDNESS_TO_ADR = [
  { key : "", value : "select one"}, { key : "Certain", value : "Certain" }, { key : "Probable / Likely", value : "Probable / Likely"},
  { key : "Possible", value : "Possible"}, { key : "Unlikely", value : "Unlikely"}, { key : "Conditional / Unclassified", value : "Conditional / Unclassified"},
  { key : "Unassessable / Unclassifiable", value : "Unassessable / Unclassifiable"}
]

export const SAE_REPORT_TYPE = [
  { key : "Initial", value : "Initial"}, { key : "Follow-up", value : "Follow-up"}, { key : "Resolution", value : "Resolution"}
]

export const EVENT_TYPE = [
  { key : "AE", value : "AE"}, { key : "SAE", value : "SAE"}, { key : "Death", value : "Death"}
]

export const SAE_EVENT_TYPE = [
  { key : "", value : "select one"}, { key : "Fatal", value : "Fatal"}, { key : "Life-threatening (an actual risk of death at the time of the event).", value : "Life-threatening (an actual risk of death at the time of the event)."},
  { key : "Caused or prolonged hospitalization (non-elective).", value : "Caused or prolonged hospitalization (non-elective)."},
  { key : "Resulted in persistent or significant disability or incapacity.", value : "Resulted in persistent or significant disability or incapacity."},
  { key : "Any other important medical event.", value : "Any other important medical event."},
]

export const SAE_TOXICITY_GRADE = [
  { key : "Grade 1", value : "Grade 1"}, { key : "Grade 2", value : "Grade 2"}, { key : "Grade 3", value : "Grade 3"}, { key : "Grade 4", value : "Grade 4"}, { key : "Grade 5", value : "Grade 5"}
]

export const LOCATION_ADVERSE_EVENT = [
  { key : "", value : "select one"}, { key : "Home", value : "1. Home"}, { key : "Clinic/Hospital", value : "2. Clinic/Hospital"}, { key : "Work", value : "3. Work"}, { key : "Study site", value : "4. Study site"} , { key : "Other", value : "5. Other, Specify"}
]

export const RESEARCH_INVOLVES = [
  { key : "", value : "select one"}, { key : "Drug", value : "1. Drug"}, { key : "Device", value : "2. Device"}, { key : "Procedure", value : "3. Procedure"},{ key : "Vaccine", value : "4. Vaccine"}, { key : "Other", value : "5. Other"}
]

export const RELATIONSHIP_SAE = [
  { key : "", value : "select one"}, { key : "Definitely related", value : "Definitely related"}, { key : "Probably related", value : "Probably related"}, { key : "Possibly related", value : "Possibly related"}, { key : "Probably not related", value : "Probably not related"},
  { key : "Not related", value : "Not related"},{ key : "Pending", value : "Pending"}
]

export const BOOLEAN_OPTIONS = [
  { key : "", value : "select one"}, { key : "Yes", value : "Yes"}, { key : "No", value : "No"}
]

export const BOOLEAN_UNKNOWN_OPTIONS = [
  { key : "", value : "select one"}, { key : "Yes", value : "Yes"}, { key : "No", value : "No"}, { key : "Unknown", value : "Unknown"}
]

export const GENDER = [
  { key : "", value : "select one"}, { key : "Male", value : "Male"}, { key : "Female", value : "Female"}, { key : "Unknown", value : "Unknown"}
]

export const AEFI_SEVERITY_REASON = [ { key: "", value: "select one" },
  { key : 'Death', value : 'Death'}, { key : 'Life-threatening', value : 'Life-threatening'},
  { key : 'Hospitalization/Prolonged', value : 'Hospitalization/Prolonged'},
  { key : 'Disabling', value : 'Disabling'}, { key : 'Congenital-anomaly', value : 'Congenital-anomaly' }
]

export const AGE_GROUP = [ { key : "neonate", value : "neonate"}, { key : "infant", value : "infant"}, { key : "child", value : "child"},
  { key : "adolescent", value : "adolescent"}, { key : "adult", value : "adult"}, { key : "elderly", value : "elderly"}
]

export const STATUS_ON_DATE = [
  { key : "Died", value: "Died"}, { key : "Disabled", value: "Disabled"},
  { key : "Recovering", value: "Recovering"}, { key : "Recovered completely", value: "Recovered completely"},
  { key : "Unknown", value: "Unknown"}
]

export const INFANT_BIRTH_OPTS = [
  { key : "full-term", value: "full-term"}, { key : "pre-term", value: "pre-term"},
  { key : "post-term", value: "post-term"}
]

export const DELIVERY_OPTS = [
  { key : "Normal", value: "Normal"}, { key : "Caesarean", value: "Caesarean"},
  { key : "Assisted (forceps, vacuum etc.)", value: "Assisted (forceps, vacuum etc.)"},
  { key : "with complication", value: "with complication"}
]

export const SOURCE_INFO = [
  { key : "source_examination", value: "Examination by the investigator"}, { key : "source_verbal", value: "Verbal autopsy"},
  { key : "source_documents", value: "Documents"},
  { key : "source_other", value: "Other"}
]

export const WHEN_VACCINATED = [
  { key : "Within the first vaccinations of the session", value: "Within the first vaccinations of the session" },
  { key : "Within the last vaccinations of the session", value: "Within the last vaccinations of the session" },
  { key : "Unknown", value: "Unknown" }
]

export const MULTI_VIALS = [
  { key : "within the first few doses of the vial administered", value: "within the first few doses of the vial administered" },
  { key : "within the last doses of the vial administered", value: "within the last doses of the vial administered" },
  { key : "Unknown", value: "Unknown" }
]

export const SYRINGES_USED = [
  { key : "Glass", value: "Glass" }, { key : "Disposable", value: "Disposable" }, { key : "Recycled disposable", value: "Recycled disposable" },
  { key : "Other", value: "Other" }
]

export const PLACE_VACCINATION = [
  { key : "Govt. health facility", value: "Govt. health facility" },
  { key : "Private health facility", value: "Private health facility" },
  { key : "Other", value: "Other" }
]

export const SITE_TYPE = [
  { key : "Fixed", value: "Fixed" }, { key : "Mobile", value: 'Mobile' },
  { key : "Outreach", value: "Outreach" }, { key : "Other", value: "Other" }
]

export const VACCINATION_IN = [
  { key : "Campaign", value: "Campaign" }, { key : "Routine", value: "Routine" },
  { key : "Other", value: "Other" }
]

export const BOOLEAN_UNABLE_OPTIONS = [
  { key : "Yes", value : "Yes"}, { key : "No", value : "No"}, { key : "Unable to assess", value : "Unable to assess"}
]

export const AEFI_ADVERSE_EVENTS = [
  { key : "ae_severe_local_reaction", value: "Severe local reaction"}, { key : "ae_seizures", value: "Seizures"},
  { key : "ae_abscess", value: "Abscess"}, { key : "ae_sepsis", value: "Sepsis"},
  { key : "ae_encephalopathy", value: "Encephalopathy"}, { key : "ae_toxic_shock", value: "Toxic shock syndrome"},
  { key : "ae_thrombocytopenia", value: "Thrombocytopenia"}, { key : "ae_anaphylaxis", value: "Anaphylaxis"},
  { key : "ae_fever", value: "Fever≥38°C"}, { key: "ae_other", value: "Other (specify)"}
]

export const AGE_ON_ONSET = [
  { key : "", value : ""}, { key : "Years", value : "Years"}, { key : "Months", value : "Months"}, { key : "Days", value : "Days"}
]

export const PROVINCES = [
  { key : "", value : ""}, { key : "1", value : "Bulawayo"}, { key : "2", value : "Harare"}, { key : "3", value : "Manicaland"},
  { key : "4", value : "Mashonaland Central"}, { key : "5", value : "Mashonaland East"}, { key : "6", value : "Mashonaland West"}, { key : "7", value : "Masvingo"},
  { key : "8", value : "Matebeleland North"}, { key : "9", value : "Matebeleland South"}, { key : "10", value : "Midlands"},
]

export const AEFI_OUTCOME = [ { key : "", value: ""},
  { key : 'Recovering', value : 'Recovering'}, { key : 'Recovered', value : 'Recovered'},
  { key : 'Not recovered', value : 'Not recovered'}, { key: 'Recovered with sequelae', value: 'Recovered with sequelae'},
  { key : 'Died', value : 'Died'}, { key : 'Unknown', value : 'Unknown'}
]


export const REPORT_TYPES = [
  { key : "", value: ""}, { key : "REPORT_TYPE_ADR", value: "ADR"}, { key : "REPORT_TYPE_SAE", value: "SAE"},
  { key : "REPORT_TYPE_AEFI", value: "AEFI Report"}, { key : "REPORT_TYPE_AEFI_INV", value: "AEFI Investigation Report"},
]

export const BOOLEAN_NA_OPTIONS = [
  { key : "Yes", value : "Yes"}, { key : "No", value : "No"}, { key : "N/A", value : "N/A"}
]

export const SEVERE_LOCAL_REACTIONS = [
  { key : "ae_3days", value: ">3 days"}, { key : "ae_beyond_joint", value: "beyond nearest joint"}
]

export const SEIZURES = [
  { key : "ae_febrile", value: "febrile"},
  { key : "ae_afebrile", value: "afebrile"}
]

export const AGE_GROUP_YEARS = [ { key : "< 1 year", value : "< 1 year"}, { key : "1-5 years", value : "1-5 years"}, { key : "> 5 years", value : "> 5 years"}]
