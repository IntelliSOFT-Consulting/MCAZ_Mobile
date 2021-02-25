import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';

import { pad } from '../../utils/utils'
import moment from 'moment'

export default class DateSelectInput extends Component {

  monthLabels = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = undefined
    var state = {}
    if(model) {
      if(model[name]) {
        let date = new Date(model[name]);
        if (!(date instanceof Date && !isNaN(date))) {
          const v = model[name].split('-');
          state.day = v[0];
          if(v[1] !== '') {
            state.month = this.monthLabels[parseInt(v[1])]
          } else {
            state.month = ''
          }
          state.year = v[2]
          // return `${this.pad(parts[0])}-${this.pad(parts[1])}-${parts[2]}`;
        } else {
          state.day = date.getDate();
          state.month = this.monthLabels[date.getMonth()];
          state.year = date.getFullYear();
        }
      }
    }
    this.state = state;
    this.handleChange = this.handleChange.bind(this)
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

    this._hideDateTimePicker();
    const { model, name, showTime, maxDate } = this.props

    const value = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    if(maxDate && !this.isValid(value)) {
      return
    }
    this.setState({ date : date })
    if(model && name) {
      model[name] = value
    }
    const { onChange, index } = this.props
    if(onChange) {
      var val = {}
      val[name] = date
      onChange(value, index)
    }
  };

  isValid = (value) => {
    const { maxDate } = this.props
    const values = value.split("-")
    const time = values[0] == "" ? moment().year(values[2]).month(values[1]) : moment().year(values[2]).month(values[1]).date(values[0])
    const now = moment(maxDate)
    const { model } = this.props
    if(now.year() == time.year() && time.month() > now.month() ) {
      return false
    } else if(now.year() == time.year() && time.month() == now.month() && time.date() > now.date()) {
      return false
    }
    return true
  }

  handleChange(itemValue, index) {
    const { name, model, onDateChange, maxDate } = this.props
    var value = model[name] == null? ['', '', ''] : model[name].split("-")
    value[index] = pad(itemValue)

    /*if(value[2] != "" && value[1] != "" && maxDate && !this.isValid(value.join("-"))) {
      value[index] = ""
      itemValue = ""
      //return
    }*/
    var state = {}
    state.day = value[0]
    state.year = value[2]
    if(index == 1) {
      state.month = this.monthLabels[itemValue - 1]
    }
    model[name] = value.join("-")
    this.setState(state)
    if(onDateChange) {
      onDateChange(value.join("-"))
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

    const months = [ { key: "", value: "" }].concat(this.monthLabels.map((month, index) => (
      { key : index + 1, value : month }
    )))

    const year = new Date().getFullYear() + 1;
    const days = [ { key: "", value: "" } ].concat(Array(31).fill("").map((value, index) => ( { key : index + 1, value : (index + 1) + '' } )))
    const years = [ { key: "", value: "" } ].concat(Array(100).fill("").map((val, index) => ({ key: (year - 100) + index, value: ((year - 100) + index) + '' })).reverse())

    return (
      <View style={ AppStyles.dateTimeInput }>
        { text }
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Dropdown labelHeight={ labelHeight }
              label='DD' onChangeText={ (itemValue) => this.handleChange(itemValue, 0) }
              data={ days } value={ this.state.day }
            />
          </View>
          <View style={{ flex: 2 }}>
            <Dropdown labelHeight={ labelHeight }
              label='MM' onChangeText={ (itemValue, itemIndex) => this.handleChange(months[itemIndex].key, 1) }
              data={ months } value={ this.state.month }
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown labelHeight={ labelHeight }
              label='YYYY' onChangeText={ (itemValue) => this.handleChange(itemValue, 2) }
              data={ years } value={ this.state.year }
            />
          </View>
        </View>
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    const { day, month, year } = this.state
    const { value } = nextProps

    const val = day + '-' + month + '-' + year
    if(val != value && value != null) {
      const v = value.split("-")
      var state = {}
      state.day = v[0]
      if(v[1] !== '' && v[1] != null) {
        state.month = this.monthLabels[parseInt(v[1])]
      } else {
        state.month = ''
      }
      state.year = v[2] != null? v[2] : ""
      this.setState(state)
    }
  }

}
