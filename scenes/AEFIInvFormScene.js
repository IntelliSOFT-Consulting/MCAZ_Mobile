import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import SectionAScene from './aefi-inv/SectionAScene'
import SectionBScene from './aefi-inv/SectionBScene'
import SectionCScene from './aefi-inv/SectionCScene'
import SectionDScene from './aefi-inv/SectionDScene'
import SectionEScene from './aefi-inv/SectionEScene'
import SectionFScene from './aefi-inv/SectionFScene'
import SectionGScene from './aefi-inv/SectionGScene'
import SectionHScene from './aefi-inv/SectionHScene'

import { connect } from 'react-redux'
import { REPORT_TYPE_AEFI_INV, SAEFI_URL } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import DeviceInfo from 'react-native-device-info';
import { getURL } from '../utils/utils';

class AEFIInvFormScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Investigation Form',
  }

  constructor(props, context) {
    super(props, context)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)
    this.upload = this.upload.bind(this)

    var { model, connection, user } = this.props

    const { route } = this.props;
    if(route.params && route.params.model) {
      model = route.params.model
    }
    var followUp = null
    if(route.params && route.params.followUp) {
      followUp = route.params.followUp
    } else if(model && model.parent_id != null) { // if the model has the parent_id field, this must be a followUp form
      followUp = true
    }
    let cancelType = 'Close';
    if(model == null) {
      cancelType = 'Cancel';
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI_INV, data_source: "phone", device_type : DeviceInfo.getSystemName(), reporter_email: user.email, reporter_name: user.name }
      if(followUp) {
        model.parent_id = ""
      }
    }
    //model =  {"rid":Date.now(),"type":"REPORT_TYPE_AEFI_INV","reporter_name":"John","telephone":"02099988","start_date":"7-11-2017","report_date":"7-11-2017","complete_date":"31-11-2017","gender":"Male","hospitalization_date":"13-11-2017","status_on_date":"Disabled","autopsy_done":"Yes","autopsy_planned":"Yes","past_history":"Unknown","adverse_event":"Unknown","allergy_history":"Unknown","existing_illness":"Unknown","hospitalization_history":"Unknown","medication_vaccination":"Unknown","faith_healers":"Unknown","family_history":"Unknown","pregnant":"Unknown","breastfeeding":"Unknown","infant":"pre-term","birth_weight":"3","delivery_procedure":"Caesarean","source_examination":"source_examination","signs_symptoms":"ss","person_details":"Ludacris","person_designation":"Speaker","person_date":"13-11-2017","medical_care":"sss","not_medical_care":"sss","final_diagnosis":"ssd","when_vaccinated":"Within the first vaccinations of the session","saefi_list_of_vaccines":[{"vaccine_name":"ss","vaccination_doses":"2"}],"prescribing_error":"No","vaccine_unsterile":"Unable to assess","vaccine_condition":"Unable to assess","vaccine_reconstitution":"Unable to assess","vaccine_handling":"Unable to assess","vaccinated_vial":"2","vaccinated_session":"1","vaccinated_locations":"2","vaccinated_cluster":"Unknown","vaccinated_cluster_vial":"Unknown","syringes_used":"Unknown","syringes_used_specify":"Other","reconstitution_multiple":"No","reconstitution_different":"Yes","cold_temperature":"No","cold_temperature_deviation":"No","procedure_followed":"No","other_items":"No","partial_vaccines":"No","unusable_vaccines":"No","cold_transportation":"No","vaccine_carrier":"No","similar_events":"Unknown","affected_vaccinated":"2","affected_unknown":"3","affected_not_vaccinated":"1","relevant_findings":"asas"}
    if(model.reports == null || model.reports.length == 0) {
      model.reports = [{}]
    }
    //state.model = model
    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Section A' },
        { key: '2', title: 'Section B' },
        { key: '3', title: 'Section C' },
        { key: '4', title: 'Section D' },
        { key: '5', title: 'Section E' },
        { key: '6', title: 'Section F' },
        { key: '7', title: 'Section G' },
        { key: '8', title: 'Section H' },
      ],
      isConnected: connection.isConnected,
      validate: false,
      followUp: followUp,
      cancelType
    }
    this.mandatory = [
      //{ name : "name_of_vaccination_site", text : "Name of vaccination site", page : 1 },
      //{ name : "designation_id", text: "Designation id", page : 1},
      //{ name : "gender", text : "Sex", page : 1 },
      //{ name : "patient_name", text : "Patient name", page : 1 },
      //{ name : 'signs_symptoms', text : "Signs and symptoms", page : 3},
      { name : "aefi_list_of_vaccines", fields: [
        { name : "batch_number", text : "Batch number" },
        { name: "vaccine_name", text: "Vaccination name"},
        { name: "vaccination_date", text: "Vaccination date"},
        { name: "vaccination_time", text: "Vaccination time"},
        { name: "dosage", text: "Dose"},
      ]}
    ]
  }

  _updateRoute = index => this.setState({ index })

  _handleIndexChange = index => this.setState({ index });

_renderHeader = props => { 
  console.log(props);
  return (<TabBar {...props} scrollEnabled={true} tabStyle={AppStyles.tabStyle} style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />)
};

  _renderScene = SceneMap({
    '1': () => <SectionAScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate } followUp={ this.state.followUp }/>,
  '2': () => <SectionBScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
'3' : () => <SectionCScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '4' : () => <SectionDScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
  '5' : () => <SectionEScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
'6' : () => <SectionFScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '7' : () => <SectionGScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
  '8' : () => <SectionHScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }
  saveAndSubmit={ this.saveAndSubmit }/>
  });

  render() {
    return (
      <TabView
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }

  saveAndContinue(next) {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
    this.setState({ cancelType: 'Close' })
    if(next) {
      this._updateRoute(next - 1)
    }
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit() {
    const { model } = this.state
    const { uploadData, saveCompleted, connection } = this.props
    var valid = true
    var names = ""
    var page = 0
    this.mandatory.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          var suspected_drug = -1;
          if (field.name === 'aefi_list_of_vaccines') {
            suspected_drug = 0;
          }
          for(let i = 0; i < values.length; i++) {
            const val = values[i]
            fields.forEach((f) => {
              if(val[f.name] == null || val[f.name] === "") {
                valid = false
                if(page == 0) {
                  page = field.page
                }
                if(arrayNames.indexOf(f.text) == -1) {
                  arrayNames.push(f.text)
                }
              }
            })
            if(val['suspected_drug'] == '1') {
              suspected_drug++
            }
          }
          /*if(suspected_drug == 0) {
            valid = false
            arrayNames.push("Select at least one suspected drug");
          }*/
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(model[field.name] == null || model[field.name] === "") {
          valid = false
          if(names != "") {
            names += ",\n "
          } else {
            page = field.page
          }
          names += field.text
        }
      }
    })
    if(!valid) {
      Alert.alert("Warning", "Fill in required fields\n " + names)
      this.setState({ validate : true })
      // this._updateRoute(page - 1)
      return
    }

    Alert.alert("Confirm", "Submit data to MCAZ?", [
      {text: 'Yes', onPress: () => this.upload() },
      {text: 'No' }
    ])

  }

  cancel() {
    let message = '';
    if (this.state.cancelType === 'Close') {
      message = 'You can always open this version from draft to complete it, close this form?';
    } else {
      message = "Stop data entry, all changes would be lost. Close?";
    }
    Alert.alert("Confirm", message, [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
  }

  goBack() {
    const { goBack } = this.props.navigation;
    goBack()
  }

  upload() {
    var { model } = this.state
    model.submitted = 2
    const { uploadData, saveCompleted, connection, token } = this.props
    if(connection.isConnected) {
      uploadData(model, getURL(model), token)
    } else {
      Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(model)
    }
    this.goBack()
  }
}

const mapStateToProps = state => {
  return {
    connection: state.connection,
    token: state.user.token,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url, token) => { // Upload the data.
      dispatch(uploadData(data, url, token))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEFIInvFormScene)
