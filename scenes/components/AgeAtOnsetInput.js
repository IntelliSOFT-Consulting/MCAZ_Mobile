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

    var value = { age_at_onset_days : "", age_at_onset_months: "", age_at_onset_years : "" }

      //if(model[name][day]) {
        value['age_at_onset_days'] = model["age_at_onset_days"] == null? "" : model["age_at_onset_days"] //model[name]['day']
      //if(model[name][month]) {
        value['age_at_onset_months'] = model["age_at_onset_months"] == null? "" : model["age_at_onset_months"] //model[name]['month']
      //if(model[name][year]) {
        value['age_at_onset_years'] = model["age_at_onset_years"] == null? "" : model["age_at_onset_years"] //model[name]['year']

    return value
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });



  handleChange(value, fieldName) {
    const { name, model, onChange } = this.props

    var state = this.state
    state[fieldName] = value
    model[fieldName] = value
    this.setState(state)
    if(onChange) {
      onChange(model[fieldName])
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
              label='Years' onChangeText={ (itemValue) => this.handleChange(itemValue, 'age_at_onset_years') }
              value={ this.state.years } keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 2 }}>
            <TextField labelHeight={ labelHeight }
              label='Months' onChangeText={ (itemValue, itemIndex) => this.handleChange(itemValue, 'age_at_onset_months') }
              value={ this.state.months } keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField labelHeight={ labelHeight }
              label='Days' onChangeText={ (itemValue) => this.handleChange(itemValue, 'age_at_onset_years') }
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
