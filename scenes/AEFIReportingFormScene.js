import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientReporterDetailsScene from './aefi-report/PatientReporterDetailsScene'
import AdverseEventsScene from './aefi-report/AdverseEventsScene'
import ReportDetailsScene from './aefi-report/ReportDetailsScene'
import VaccinationScene from './aefi-report/VaccinationScene'


import { connect } from 'react-redux'
import { REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'
import { AEFI_MANDATORY_FIELS } from '../utils/FormFields'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

class AEFIReportingFormScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Report form',
  }

  constructor(props, context) {
    super(props, context)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)

    var { model, connection } = this.props

    const { navigation } = this.props;
    if(navigation.state.params && navigation.state.params.model) {
      model = navigation.state.params.model
    }

    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI, "name_of_institution" : "Nairobi Hosp", "sadr_list_of_drugs" : [ { "brand_name" : "dawa", "dose_id" : "1" }], user: {} }
    }
    //state.model = model
    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Patient/Reporter details' },
        { key: '2', title: 'Vaccination' },
        { key: '3', title: 'Adverse events' },
        { key: '4', title: 'Report details' },
      ],
      isConnected: connection.isConnected,
      validate: false
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _updateRoute = index => this.setState({ index })

  _renderScene = SceneMap({
    '1' : () => <PatientReporterDetailsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '2' : () => <VaccinationScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '3' : () => <AdverseEventsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }/>,
    '4' : () => <ReportDetailsScene model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } validate={ this.state.validate }
            saveAndSubmit={ this.saveAndSubmit } />
  });

  render() {
    return (
      <TabViewAnimated
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }

  saveAndContinue() {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
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
    AEFI_MANDATORY_FIELS.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
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
          }
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(field.dependent) {
          if(model[field.dependent] == field.value && (model[field.name] == null || model[field.name] === "")) {
            valid = false
            if(names != "") {
              names += ",\n "
            } else {
              page = field.page
            }
            names += field.text
          }
        } else if(model[field.name] == null || model[field.name] === "") {
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
      this._updateRoute(page - 1)
      return
    }

    if(connection.isConnected) {
      uploadData(model, AEFI_URL)
    } else {
      Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(model)
    }
    this.goBack()
  }

  cancel() {
    Alert.alert("Confirm", "Stop data entry?", [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
  }

  goBack() {
    const { goBack } = this.props.navigation;
    goBack()
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url) => { // Upload the data.
      dispatch(uploadData(data, url))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportingFormScene)
