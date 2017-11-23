export const SEVERITY_REASON = [ { key: "", value: "select one" },
  { key : 'Death', value : 'Death'}, { key : 'Life-threatening', value : 'Life-threatening'},
  { key : 'Hospitalizaion/Prolonged', value : 'Hospitalizaion/Prolonged'},
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

export const FREQUENCY = [{"key":"1", value: ""},{"key":"2","value":"OD"},{"key":"3","value":"BD"},{"key":"4","value":"TID."},{"key":"5","value":"QID|QDS"},{"key":"6","value":"PRN"},{"key":"7","value":"MANE"},{"key":"8","value":"NOCTE"},{"key":"9","value":"STAT"}]

export const DESIGNATION = [ { key : "", value: ""},
  { key : "1", value : 'physician' }, { key : "2", value : 'pharmacist' }, { key : "3", value : 'other professional' },
  { key : "5", value : 'consumer or other non health professional' }
]

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
  { key : "", value : "select one"}, { key : "Home", value : "1. Home"}, { key : "Clinic/Hospital", value : "2. Clinic/Hospital"}, { key : "Work", value : "3. Work"}, { key : "Study site", value : "4. Study site"} , { key : "Other,", value : "5. Other, Specify"}
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
  { key : "", value : "select one"}, { key : "Male", value : "Male"}, { key : "Female", value : "Female"} //, { key : "Unknown", value : "Unknown"}
]

export const AEFI_SEVERITY_REASON = [ { key: "", value: "select one" },
  { key : 'Death', value : 'Death'}, { key : 'Life-threatening', value : 'Life-threatening'},
  { key : 'Hospitalizaion/Prolonged', value : 'Hospitalizaion/Prolonged'},
  { key : 'Disabling', value : 'Disabling'}, { key : 'Congenital-anomaly', value : 'Congenital-anomaly' }
]
