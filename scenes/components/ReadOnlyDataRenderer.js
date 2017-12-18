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
      return model[name]
      /*var date = []
      if(model[name]['day']) {
        date.push(model[name]['day'])
      }
      if(model[name]['month']) {
        date.push(model[name]['month'])
      }
      if(model[name]['year']) {
        date.push(model[name]['year'])
      }
      return date.join("/")*/
    } else if(type == 'option' && options) {
      var values = ""
      if(typeof model[name] == 'string') {
        values = model[name].split(",")
      } else {
        values = [model[name]]
      }

      var renderValue = []
      options.forEach((option) => {
        if(values.indexOf(option.key) != -1) {
          renderValue.push(option.value)
        }
      })

      if(renderValue.length > 0) {
        return renderValue.join(",")
      }
      return model[name]
    } else if(type == 'file') {
      return model['filename']
    } else if(name == 'age_at_onset') {
      var val = ""
      if(model['age_at_onset_years'] != null && model['age_at_onset_years'] != "") {
        val += model['age_at_onset_years'] + " Years"
      }
      if(model['age_at_onset_months'] != null && model['age_at_onset_months'] != "") {
        val += model['age_at_onset_months'] + " Months"
      }
      if(model['age_at_onset_days'] != null && model['age_at_onset_days'] != "") {
        val += model['age_at_onset_days'] + " Days"
      }
      return val
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
