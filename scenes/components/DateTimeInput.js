import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button, Platform } from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
export default class DateTimeInput extends Component {


  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = undefined
    if(model) {
      if(model[name]) {
        if(typeof model[name] == "string") {
          const v = model[name].split("-")
          value = new Date();
          value.setDate(v[0])
          value.setMonth(parseInt(v[1]) - 1)
          value.setYear(v[2])
        }
      }
    }
    this.state = {
      isDateTimePickerVisible: false,
      date : value
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _toggleDateTimePicker = (visibility) => this.setState({ isDateTimePickerVisible: visibility });

  _handleDatePicked = (event, date) => {
    if (Platform.OS === 'android') {
      this._hideDateTimePicker()
    };
    if (!date) {
      return;
    }
    const { model, name, showTime } = this.props
    if(model && name) {
      const mode = showTime? "datetime" : this.props.mode? this.props.mode : "date"
      var value = {}
      value['day'] = date.getDate()
      value['month'] = date.getMonth()
      value['year'] = date.getFullYear()
      model[name] = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      if(showTime) {
        value['hour'] = date.getHours()
        value['minute'] = date.getMinutes()
        model[name] += " " + date.getHours() + ":" + date.getMinutes()
      }
      if(mode == "time") {
        model[name] = " " + date.getHours() + ":" + date.getMinutes()
      }
    }
    this.setState({ date : date })
    const { onChange, index } = this.props
    if(onChange) {
      var value = {}
      value[name] = date
      onChange(value, index)
    }
  };

  render () {
    const { label, required, showTime, maxDate, minDate, model, name } = this.props
    const { date, isDateTimePickerVisible } = this.state
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
    const mode = showTime? "datetime" : this.props.mode? this.props.mode : "date"
    var dateLabel = mode == "time" ? "Select time" : "Select date"
    if(date != null && date != "" && model[name] != null) {
      dateLabel = model[name] // date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    const maxDateVal = maxDate? maxDate : undefined
    const minimumDate = minDate? minDate : undefined
    return (
      <View style={ AppStyles.dateTimeInput }>
        <Text>{ text }</Text>
        <Button onPress={() => this._toggleDateTimePicker(!isDateTimePickerVisible)} title={ dateLabel }/>
        {isDateTimePickerVisible && (
          <DateTimePicker
            value={ date ? new Date(date) : new Date() }
            datePickerModeAndroid="spinner"
            minimumDate={ minimumDate }
            maximumDate={ maxDateVal }
            onChange={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode={ mode }
          />
        )}
        
      </View>
    );
  }
}
