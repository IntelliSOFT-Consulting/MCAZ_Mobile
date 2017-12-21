import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'

import { connect } from 'react-redux'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'
import { REPORT_TYPE_ADR_FOLLOW_UP, REPORT_TYPE_AEFI_FOLLOW_UP, REPORT_TYPE_SAE_FOLLOW_UP } from '../utils/Constants'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

import ADRReadOnly from './adr/ADRReadOnly'
import SAEReadOnly from './sae/SAEReadOnly'
import AEFIReportReadOnly from './aefi-report/AEFIReportReadOnly'
import AEFIInvReadOnly from './aefi-inv/AEFIInvReadOnly'
import ADRFollowupReadOnly from "./adr/ADRFollowupReadOnly"
import AEFIFollowupReadOnly from "./aefi-report/AEFIFollowupReadOnly"

class ReadOnlyReportScene extends PureComponent {
  static navigationOptions = {
    title: 'ADR Report form',
  }


  constructor(props, context) {
    super(props, context)

    this.goBack = this.goBack.bind(this)

    var { model, connection } = this.props

    const { navigation } = this.props;
    if(navigation.state.params && navigation.state.params.model) {
      model = navigation.state.params.model
    }
    this.state = {
      model : model
    }

  }

  _getReportView = () => {
    const { model } = this.state
    switch(model.type) {
      case REPORT_TYPE_ADR:
        return (<ADRReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_SAE:
        return (<SAEReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_AEFI:
        return (<AEFIReportReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_AEFI_INV:
        return (<AEFIInvReadOnly model={ model } goBack={ this.goBack } />)
      case REPORT_TYPE_ADR_FOLLOW_UP:
        return (<ADRFollowupReadOnly model={ model } goBack={ this.goBack } />)
      case REPORT_TYPE_AEFI_FOLLOW_UP:
        return (<AEFIFollowupReadOnly model={ model } goBack={ this.goBack } />)
      case REPORT_TYPE_SAE_FOLLOW_UP:
        return (<SAEFollowupReadOnly model={ model } goBack={ this.goBack }/>)
      default:
        return null
    }
  }

  render() {
    const { model } = this.state
    const view = this._getReportView()
    return (
      view
    );
  }

  goBack() {
    const { goBack } = this.props.navigation;
    goBack()
  }

  createFollowup = (model, screen) => {
    const { navigate } = this.props.navigation
    const data  = { model : model }
    navigate(screen, data)
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
