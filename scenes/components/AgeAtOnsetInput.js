import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { TextField } from 'react-native-material-textfield'
import { Dropdown } from 'react-native-material-dropdown';

import { pad } from '../../utils/utils'

export default class AgeAtOnsetInput extends Component {

  monthLabels = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = this.getModelValue(model, name)

    this.state = value;
    this.handleChange = this.handleChange.bind(this)
  }

  getModelValue = (model, name) => {

    var value = { days : "", months: "", years : "" }
    if(model && model[name]) {
      if(typeof model[name] == "object") {
      //if(model[name][day]) {
        value['days'] = model[name]["days"] == null? "" : model[name]["days"] //model[name]['day']
      //if(model[name][month]) {
        value['months'] = model[name]["months"] == null? "" : model[name]["months"] //model[name]['month']
      //if(model[name][year]) {
        value['years'] = model[name]["years"] == null? "" : model[name]["years"] //model[name]['year']
      }
    }
    return value
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });



  handleChange(value, fieldName) {
    const { name, model, onChange } = this.props

    var state = this.state
    state[fieldName] = value
    model[name] = state
    this.setState(state)
    if(onChange) {
      onChange(model[name])
    }
  }

  render = () => {
    const { label, required, showTime, maxDate, minDate, hideLabel } = this.props
    const { date } = this.state
    var text = null
    if(required) {
      text = (
        <Text>{ label } <Text style={ AppStyles.required }>*</Text></Text>
      )
    } else {
      text =(
        <Text>{ label }</Text>
      )
    }
    labelHeight = 16
    if(hideLabel) {
      text = null
      labelHeight = 0
    }

    return (
      <View style={ AppStyles.dateTimeInput }>
        { text }
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TextField labelHeight={ labelHeight }
              label='Years' onChangeText={ (itemValue) => this.handleChange(itemValue, 'years') }
              value={ this.state.years } keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 2 }}>
            <TextField labelHeight={ labelHeight }
              label='Months' onChangeText={ (itemValue, itemIndex) => this.handleChange(itemValue, 'months') }
              value={ this.state.months } keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField labelHeight={ labelHeight }
              label='Days' onChangeText={ (itemValue) => this.handleChange(itemValue, 'days') }
              value={ this.state.days } keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    const { days, months, years } = this.state
    const { value, model, name } = nextProps

    const val = this.getModelValue(model, name)
    if(val.days != days || val.months != months || val.years != years) {
      this.setState(val)
    }
  }

}
