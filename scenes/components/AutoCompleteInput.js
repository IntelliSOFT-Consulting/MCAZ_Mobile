import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../../styles/AppStyles'

import AutoCompleteTextInput from './AutoCompleteTextInput'
import facilities from '../../data/facilities.json'

import { TextField } from 'react-native-material-textfield'

export default class AutoCompleteInput extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(name && model && model[name]) {
      value = model[name]
    }
    this.state = { value : value }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(value) {
    this.setState({ value })
    var { name, model } = this.props
    const newVal = '';
    if(typeof value == "object") {
      newVal = value.name
    } else {
      newVal = value
    }
    this.setState({ value : newVal })
    const { onChange } = this.props
    if(onChange) {
      onChange(value)
    }
  }

  render() {
    const { label, required, validate, hideLabel } = this.props
    const { value } = this.state

    var text = null
    if(required) {
      const colorLabel = (value == "" && validate)? AppStyles.required : {}
      text = (
        <Text style={ colorLabel }>{ label } <Text style={ AppStyles.required }>*</Text></Text>
      )
    } else {
      text =(
        <Text>{ label }</Text>
      )
    }
    const labelText = label? label : ""

    return (
      <View> 
        <AutoCompleteTextInput otherTextInputProps={{ editable: true }}
          placeholder={ labelText } value={ this.state.value }
          onItemPress={(item) => this.handleChange(item) }
          data={ facilities }
        />
      </View>
    )
  }
}
// { text }
// <TextInput {...this.props} onChangeText={(text) => this.handleChange(text)} value={ this.state.value }/>
