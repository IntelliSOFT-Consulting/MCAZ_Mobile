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
    if(type == "text") {
      return model[name]
    } else if(type == 'date') {
      return model[name]['day'] + "/" + model[name]['month'] + "/" + model[name]['year']
    } else if(type == 'option' && options) {
      return model[name]
    }
    return ''
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
