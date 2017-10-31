import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatList, Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import SelectMultipleField from './components/SelectMultipleField'
import MedicationTableComponent from './components/MedicationTableComponent'
import AppStyles from '../styles/AppStyles'

import { saveDraft } from '../actions'

class SavedReportsScene extends Component {
  static navigationOptions = {
    title: '',
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
    console.log(JSON.stringify(item))
    const { navigate } = this.props.navigation;
    navigate("ReportsListScene", item)
  }

  cancel() {

  }

  render() {
    console.log("showing saved reports")
    return (
      <View style={ AppStyles.scrollContainer }>
        <FlatList data={[{ key: "ADR"}, { key: "SAE"}, { key: "AEFI" }, ]}
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
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedReportsScene)
