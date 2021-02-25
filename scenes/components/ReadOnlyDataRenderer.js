import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import AppStyles from '../../styles/AppStyles'
import moment from 'moment'

export default class ReadOnlyDataRenderer extends Component {

  constructor(props) {
    super(props)
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  pad = (value) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  }

  getFieldValue(name) {
    const { model, type, options } = this.props
    if(model[name] == null) {
      return ""
    }
    if(type == 'date') {
      if(model[name] != null && model[name] != '') {
        let date = new Date(model[name]);
        if (!(date instanceof Date && !isNaN(date))) {
          const parts = model[name].split('-');
          return `${this.pad(parts[0])}-${this.pad(parts[1])}-${parts[2]}`;
        }
        let val = moment(date).format("DD-MM-YYYY");
        return val;
      }
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
        if(values.indexOf(option.key) != -1 || (!isNaN(option.key) && values.indexOf(Number(option.key)) != -1)) {
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
