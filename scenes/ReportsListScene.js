import React, { Component } from 'react';
import { connect } from 'react-redux'
import { SectionList, Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import MedicationTableComponent from './components/MedicationTableComponent'
import AppStyles from '../styles/AppStyles'

import { saveDraft } from '../actions'

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
    return(
      <Text style={ AppStyles.listItem } onPress={ () => this.onItemPressed(item) }>
        { item.rid }
      </Text>
    )
  }

  onItemPressed(item) {
    console.log(JSON.stringify(item))
  }

  render() {
    const { navigation } = this.props;
    const { drafts, completed, uploaded } = this.props
    const data = ([
      { title : 'Drafts (' + drafts.length + ')', data : drafts, key: 'drafts' },
      { title : 'Completed (' + completed.length + ')', data : completed, key: 'completed' },
      { title : 'Uploaded (' + uploaded.length + ')', data : uploaded, key: 'uploaded' },
    ])
    //console.log(navigation) navigation.state.params.key
    return (
      <View style={ AppStyles.sectionListContainer }>
        <SectionList sections={ data }
          renderItem={this.renderItem} renderSectionHeader={ ({ section }) => <Text style={ AppStyles.sectionHeader }>{ section.title }</Text>}/>
      </View>
    );
  }
}

const getVisibleReports = (reports, filter) => {
  return reports.filter(report => report.type == filter.type)
}

const mapStateToProps = state => {
  console.log(state)
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
