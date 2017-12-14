import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import AppStyles from '../../styles/AppStyles'

import { TextField } from 'react-native-material-textfield'

export default class TextInputField extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(name && model) {
      value = model[name]
    }
    this.state = { value : value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    var { name, model } = this.props
    if(model) {
      model[name] = value
    }
    const { onChange } = this.props
    if(onChange) {
      onChange(model[name])
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
    const labelHeight = hideLabel? 0 : 16
    return (
      <View>
        <TextField {...this.props}
          label={ labelText } labelHeight={ labelHeight }
          value={ this.state.value }
          onChangeText={ (text) => this.handleChange(text) }
        />

      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { model, name } = this.props
    var { value } = this.state
    const newModel = nextProps.model
    if(value != newModel[name] && newModel[name] != null) {
      const val = newModel[name]
      this.setState({ value : val })
    }
  }
}
// { text }
// <TextInput {...this.props} onChangeText={(text) => this.handleChange(text)} value={ this.state.value }/>
