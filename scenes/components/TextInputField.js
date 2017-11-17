import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import AppStyles from '../../styles/AppStyles'

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
  }

  render() {
    const { label, required, validate } = this.props
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
    return (
      <View>
        { text }
        <TextInput {...this.props} onChangeText={(text) => this.handleChange(text)} value={ this.state.value }/>
      </View>
    )
  }
}
