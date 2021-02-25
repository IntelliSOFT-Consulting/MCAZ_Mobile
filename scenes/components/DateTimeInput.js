import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button, Platform } from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class DateTimeInput extends Component {


  constructor(props) {
    super(props)
    const { model, name, showTime } = this.props
    var value = undefined
    if(model) {
      if(model[name]) {
        let date = new Date(model[name]);
        if (!(date instanceof Date && !isNaN(date))) {
          const v = model[name].split('-');
          value = new Date();
          value.setDate(v[0])
          value.setMonth(parseInt(v[1]) - 1)
          value.setYear(v[2])
          if (showTime) {
            value = moment(value).format('DD-MM-YYYY HH:mm')
          } else {
            value = moment(value).format('DD-MM-YYYY')
          }
          // return `${this.pad(parts[0])}-${this.pad(parts[1])}-${parts[2]}`;
        } else {
          value = date;
          if (showTime) {
            value = moment(date).format('DD-MM-YYYY HH:mm')
          } else {
            value = moment(date).format('DD-MM-YYYY')
          }
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
    const pad = (value) => {
      if (value < 10) {
        return `0${value}`;
      }
      return value
    }
    
    const { model, name, showTime } = this.props
    if(model && name) {
      const mode = showTime ? "datetime" : this.props.mode ? this.props.mode : "date"
      var value = {}
      value['day'] = date.getDate()
      value['month'] = date.getMonth()
      value['year'] = date.getFullYear()
      model[name] = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      if(showTime) {
        value['hour'] = date.getHours()
        value['minute'] = date.getMinutes()
        model[name] += " " + date.getHours() + ":" + pad(date.getMinutes())
      }
      if(mode == "time") {
        model[name] = " " + date.getHours() + ":" + pad(date.getMinutes())
      }
      const display = mode === 'time' ? model[name] : showTime ? moment(date).format('DD-MM-YYYY HH:mm') : moment(date).format('DD-MM-YYYY');
      this.setState({ date : display })
    }
    
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
    const mode = showTime ? "datetime" : this.props.mode? this.props.mode : "date"
    var dateLabel = mode == "time" ? "Select time" : "Select date";
    if (name === 'diluent_date') {
      dateLabel = 'Select Time of reconstitution'
    }
    if(date != null && date != "" && model[name] != null) {
      dateLabel = `${date}`; //model[name] // date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    const maxDateVal = maxDate? maxDate : undefined
    const minimumDate = minDate? minDate : undefined
    return (
      <View style={ AppStyles.dateTimeInput }>
        <Text>{ text }</Text>
        <Button
          onPress={() => this._toggleDateTimePicker(!isDateTimePickerVisible)}
          title={ dateLabel }
          style={{ color: '#ffffff' }}
        />
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
