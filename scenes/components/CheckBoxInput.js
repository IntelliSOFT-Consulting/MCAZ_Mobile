import React, { Component } from 'react';
import { Text, View, CheckBox } from 'react-native'

export default class CheckBoxInput extends Component {

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
    const { label } = this.props
    return (
      <View>
        <CheckBox {...this.props} onChange={(text) => this.handleChange(text)} value={ this.state.value }/>
      </View>
    )
  }
}
