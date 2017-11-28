import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatList, Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import MedicationTableComponent from './components/MedicationTableComponent'
import AppStyles from '../styles/AppStyles'

import { setReportFilter } from '../actions'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

class SavedReportsScene extends Component {
  static navigationOptions = {
    title: 'Saved Reports',
  }

  constructor(props, context) {
    super(props, context)
    this.renderItem = this.renderItem.bind(this)
    this.onItemPressed = this.onItemPressed.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  renderItem({item}) {
    return(
      <Text style={ AppStyles.listItem } onPress={ () => this.onItemPressed(item) }>
        { item.key }
      </Text>
    )
  }

  onItemPressed(item) {
    const { setReportFilter } = this.props
    const { navigate } = this.props.navigation;
    setReportFilter(item.type)
    navigate("ReportsListScene", item)
  }

  cancel() {

  }

  render() {
    return (
      <View style={ AppStyles.scrollContainer }>
        <FlatList data={[{ key: "ADR", type : REPORT_TYPE_ADR }, { key: "SAE", type : REPORT_TYPE_SAE },
          { key: "AEFI", type : REPORT_TYPE_AEFI }, { key: "AEFI Inv.", type : REPORT_TYPE_AEFI_INV } ]}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

    //archived: state.currentForms.archived,
    //formListVisible: (state.currentFormList == null)? false : true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setReportFilter: (filter) => {
      dispatch(setReportFilter(filter))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedReportsScene)
