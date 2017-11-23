import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import AppStyles from '../../styles/AppStyles'

export default class ReadOnlyDataRenderer extends Component {

  constructor(props) {
    super(props)
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  getFieldValue(name) {
    const { model, type, options } = this.props
    if(model[name] == null) {
      return ""
    }
    if(type == 'date') {
      var date = []
      if(model[name]['day']) {
        date.push(model[name]['day'])
      }
      if(model[name]['month']) {
        date.push(model[name]['month'])
      }
      if(model[name]['year']) {
        date.push(model[name]['year'])
      }
      return date.join("/")
    } else if(type == 'option' && options) {
      return model[name]
    }
    return model[name]
  }

  render() {
    const { label, model, name, type } = this.props
    return (
      <View>
        <Text style={ AppStyles.boldText }>{ label }</Text>
        <Text>{ this.getFieldValue(name) }</Text>
      </View>
    )
  }
}
