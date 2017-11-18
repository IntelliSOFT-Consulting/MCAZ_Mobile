import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientDetails from './adr/PatientDetails'
import Medication from './adr/Medication'
import ReporterDetailsScene from './adr/ReporterDetailsScene'
import AdverseReactionScene from './adr/AdverseReactionScene'
import { connect } from 'react-redux'
import { REPORT_TYPE_ADR } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import ADRReadOnly from './adr/ADRReadOnly'

class ReadOnlyReportScene extends PureComponent {
  static navigationOptions = {
    title: 'ADR Report form',
  }


  constructor(props, context) {
    super(props, context)

    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)

    var { model, connection } = this.props

    const { navigation } = this.props;
    if(navigation.state.params && navigation.state.params.model) {
      model = navigation.state.params.model
    }
    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Patient details' },
        { key: '2', title: 'Adverse reaction' },
        { key: '3', title: 'Medication' },
        { key: '4', title: 'Reported by' },
      ],
      isConnected: connection.isConnected,
      validate: false
    }

  }


  render() {
    const { model } = this.state
    
    return (
      <ADRReadOnly model={ model } />
    );
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
    uploadData: (data) => { // Upload the data.
      dispatch(uploadData(data))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyReportScene)
