import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatList, Text, View, TextInput, ScrollView, Button, TouchableOpacity, BackHandler } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import MedicationTableComponent from './components/MedicationTableComponent'
import AppStyles from '../styles/AppStyles'

import { setReportFilter } from '../actions'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'
import { REPORT_TYPE_ADR_FOLLOW_UP, REPORT_TYPE_AEFI_FOLLOW_UP } from '../utils/Constants'

class SavedReportsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Saved Reports',
      headerRight: (
        <Button
          title="Close"
          onPress={
            () => navigation.goBack(null)
          }
        />
      )
    }

  }

  constructor(props, context) {
    super(props, context)
    this.renderItem = this.renderItem.bind(this)
    this.onItemPressed = this.onItemPressed.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  renderItem({item}) {
    return(
      <TouchableOpacity onPress={ () => this.onItemPressed(item) }>
        <View style={ AppStyles.rowItemStyle }>
          <Text  >
            { item.key }
          </Text>
        </View>
      </TouchableOpacity>
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

  goBack = () => {
    const { goBack } = this.props.navigation
    goBack()
  }

  _renderSeparator = () => {
    return (
      <View
        style={ AppStyles.separator }
      />
    );
  };

  render() {
    return (
      <View style={ AppStyles.sectionListContainer }>
        <FlatList data={[{ key: "ADR", type : { main : REPORT_TYPE_ADR, followUp: REPORT_TYPE_ADR_FOLLOW_UP } }, { key: "SAE", type : { main : REPORT_TYPE_SAE } },
          { key: "AEFI", type : { main : REPORT_TYPE_AEFI, followUp : REPORT_TYPE_AEFI_FOLLOW_UP } }, { key: "AEFI Inv.", type : { main : REPORT_TYPE_AEFI_INV } } ]}
          renderItem={this.renderItem} ItemSeparatorComponent={ this._renderSeparator }/>
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
