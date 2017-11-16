import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimeInput extends Component {


  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = null
    if(model) {
      if(model[name]) {
        const val = model[name]
        if(val.day && val.month && val.year) {
          value = new Date();
          value.setDate(val.day)
          value.setMonth(parseInt(val.month) - 1)
          value.setYear(val.year)
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

  _handleDatePicked = (date) => {
    this.setState({ date : date })
    this._hideDateTimePicker();
    const { model, name } = this.props
    if(model && name) {
      model[name] = {
        day : date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    }
  };

  render () {
    const { label, required } = this.props
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
    var dateLabel = "Select date"
    if(date != null && date != "") {
      dateLabel = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }
    return (
      <View style={ AppStyles.dateTimeInput }>
        <Text>{ text }</Text>
        <Button onPress={this._showDateTimePicker} title={ dateLabel }/>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
