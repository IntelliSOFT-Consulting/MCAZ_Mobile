export const SEVERITY_REASON = [ { key: "", value: "" },
  { key : 'Death', value : 'Death'}, { key : 'Life-threatening', value : 'Life-threatening'},
  { key : 'Hospitalizaion/Prolonged', value : 'Hospitalizaion/Prolonged'},
  { key : 'Disabling', value : 'Disabling'}, { key : 'Congenital-anomaly', value : 'Congenital-anomaly'},
  { key : 'Other Medically Important Reason', value : 'Other Medically Important Reason'}
]

export const OUTCOME = [ { key : "", value: ""},
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
