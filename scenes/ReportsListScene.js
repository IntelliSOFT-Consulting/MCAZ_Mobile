import React, { Component } from 'react';
import { connect } from 'react-redux'
import { SectionList, Text, View, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import MedicationTableComponent from './components/MedicationTableComponent'
import AppStyles from '../styles/AppStyles'

import { saveDraft } from '../actions'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

class ReportsListScene extends Component {
  static navigationOptions = ({ navigation, screenProps}) => ({
    title: navigation.state.params.key + ' Reports'
  })

  constructor(props, context) {
    super(props, context)
    this.renderItem = this.renderItem.bind(this)
    this.onItemPressed = this.onItemPressed.bind(this)
  }

  renderItem({item}) {
    //var title = new Date(item.rid).toGMTString()

    const title = item.reference_number != null? item.reference_number : new Date(item.rid).toString()
    return (
      <TouchableOpacity onPress={ () => this.onItemPressed(item) }>
        <View style={ AppStyles.rowItemStyle }>
          <Text  >
            { title }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  onItemPressed(item) {
    const model = { model : item }
    const { navigate } = this.props.navigation;
    const { drafts, completed, uploaded } = this.props

    var found = drafts.find((i) => i.rid == item.rid)
    var scene;
    if(found) {
      if(item.type == REPORT_TYPE_ADR) {
        navigate('ADRScene', model) //
      } else if(item.type == REPORT_TYPE_SAE) {
        navigate('SAEFormScene', model)
      } else if(item.type == REPORT_TYPE_AEFI_INV) {
        navigate('AEFIInvFormScene', model)
      } else if(item.type == REPORT_TYPE_AEFI) {
        navigate('AEFIReportingFormScene', model)
      }
      return
    }
    if(item.type == REPORT_TYPE_ADR) {
      navigate('ReadOnlyReportScene', model) //ADRScene
    } else if(item.type == REPORT_TYPE_SAE) {
      navigate('ReadOnlyReportScene', model)
    } else if(item.type == REPORT_TYPE_AEFI_INV) {
      navigate('ReadOnlyReportScene', model)
    } else if(item.type == REPORT_TYPE_AEFI) {
      navigate('ReadOnlyReportScene', model)
    }
  }

  _renderSeparator = () => {
    return (
      <View
        style={ AppStyles.separator }
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const { drafts, completed, uploaded } = this.props
    const data = ([
      { title : 'Drafts (' + drafts.length + ')', data : drafts, key: 'drafts' },
      { title : 'Completed (' + completed.length + ')', data : completed, key: 'completed' },
      { title : 'Uploaded (' + uploaded.length + ')', data : uploaded, key: 'uploaded' },
    ])
    return (
      <View style={ AppStyles.sectionListContainer }>
        <SectionList sections={ data } keyExtractor={(item, index) => 'key-' + index } ItemSeparatorComponent={ this._renderSeparator }
          renderItem={ this.renderItem } renderSectionHeader={ ({ section }) => <Text style={ AppStyles.sectionHeader }>{ section.title }</Text>}/>
      </View>
    );
  }
}

const getVisibleReports = (reports, filter) => {
  return reports.filter(report => report.type == filter.type)
}

const mapStateToProps = state => {
  return {
    drafts : getVisibleReports(state.appState.drafts, state.appState.reportFilter),
    completed : getVisibleReports(state.appState.completed, state.appState.reportFilter),
    uploaded : getVisibleReports(state.appState.uploaded, state.appState.reportFilter),
    //archived: state.currentForms.archived,
    //formListVisible: (state.currentFormList == null)? false : true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsListScene)
