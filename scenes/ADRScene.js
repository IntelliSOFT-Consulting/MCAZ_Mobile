import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientDetails from './adr/PatientDetails'
import Medication from './adr/Medication'
import ReporterDetailsScene from './adr/ReporterDetailsScene'
import AdverseReactionScene from './adr/AdverseReactionScene'
import { connect } from 'react-redux'
import { REPORT_TYPE_ADR } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

class ADRScene extends PureComponent {
  static navigationOptions = {
    title: 'ADR Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Patient details' },
      { key: '2', title: 'Adverse reaction' },
      { key: '3', title: 'Medication' },
      { key: '4', title: 'Reported by' },
    ],
  };

  constructor(props, context) {
    super(props, context)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)

    var { model, connection } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_ADR, "name_of_institution" : "Nairobi Hosp", "sadr_list_of_drugs" : [ { "brand_name" : "dawa", "dose_id" : "1" }], user: {} }
    }
    //state.model = model
    this.state = {
      model: model,
      index: 0,
      routes: [
        { key: '1', title: 'Patient details' },
        { key: '2', title: 'Adverse reaction' },
        { key: '3', title: 'Medication' },
        { key: '4', title: 'Reported by' },
      ],
      isConnected: connection.isConnected
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _renderScene = SceneMap({
    '1' : () => <PatientDetails model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } />,
    '2' : () => <AdverseReactionScene saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } />,
    '3' : () => <Medication model={ this.state.model } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } />,
    '4' : () => <ReporterDetailsScene model={ this.state.model } user={ this.state.model.user } saveAndContinue={ this.saveAndContinue } cancel={ this.cancel } saveAndSubmit={ this.saveAndSubmit }/>,
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
    const { uploadData, saveCompleted } = this.props
    if(this.status.isConnected) {
      uploadData(model)
    } else {
      saveCompleted(data)
    }
  }

  cancel() {
    const { navigate } = this.props.navigation;
    navigate("MainScene")
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    //formListVisible: (state.currentFormList == null)? false : true
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

export default connect(mapStateToProps, mapDispatchToProps)(ADRScene)
