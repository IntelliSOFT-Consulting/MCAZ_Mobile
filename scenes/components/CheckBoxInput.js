import React, { Component } from 'react';
import { Text, View } from 'react-native'
import CheckBox from 'react-native-check-box'

export default class CheckBoxInput extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(name && model) {
      value = model[name]
    }
    this.state = { checked : (value == "1") ? true : false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    var { checked } = this.state
    var { name, model } = this.props
    if(model) {
      model[name] = !checked? "1" : "0"
    }
    this.setState({ checked : !checked })
  }

  render() {
    const { label } = this.props
    return (
      <View>
        <CheckBox {...this.props} onClick={ () => this.handleChange(data)} isChecked={this.state.checked} />
      </View>
    )
  }
}
