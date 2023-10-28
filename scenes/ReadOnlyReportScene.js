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
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Report',
    }
  }

  constructor(props, context) {
    super(props, context)

    this.goBack = this.goBack.bind(this)

    var { model, connection } = this.props

    const { route } = this.props;
    if(route.params && route.params.model) {
      model = route.params.model
    }
    this.state = {
      model : model
    }
    this.getTitle(model);
  }

  getTitle = (model) => {
    const { navigation } = this.props;
    switch(model.type) {
      case REPORT_TYPE_ADR:
        navigation.setOptions({ title: 'ADR Report' })
        break;
      case REPORT_TYPE_SAE:
        navigation.setOptions({ title: 'SAE Report' })
        break;
      case REPORT_TYPE_AEFI:
        navigation.setOptions({ title: 'AEFI Report' })
        break;
      case REPORT_TYPE_AEFI_INV:
        navigation.setOptions({ title: 'AEFI Inv. Report' })
        break;
      case REPORT_TYPE_ADR_FOLLOW_UP:
        navigation.setOptions({ title: 'ADR Followup Report' })
        break;
      case REPORT_TYPE_AEFI_FOLLOW_UP:
        navigation.setOptions({ title: 'AEFI Followup Report' })
        break;
      case REPORT_TYPE_SAE_FOLLOW_UP:
        navigation.setOptions({ title: 'SAE Followup Report' })
        break;
      default:
        return null
    }
  }

  _getReportView = () => {
    const { model } = this.state
    const { navigation } = this.props;
    switch(model.type) {
      case REPORT_TYPE_ADR:
        return (<ADRReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_SAE:
        return (<SAEReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_AEFI:
        return (<AEFIReportReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_AEFI_INV:
        return (<AEFIInvReadOnly model={ model } goBack={ this.goBack } createFollowup={ this.createFollowup } />)
      case REPORT_TYPE_ADR_FOLLOW_UP:
        return (<ADRReadOnly model={ model } goBack={ this.goBack } />)
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
    connection: state.connection,
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
