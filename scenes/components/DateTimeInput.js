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

  _handleDatePicked = (date) => {
    this.setState({ date : date })
    this._hideDateTimePicker();
    const { model, name, showTime } = this.props
    if(model && name) {
      var value = {}
      value['day'] = date.getDay()
      value['month'] = date.getMonth()
      value['year'] = date.getFullYear()
      if(showTime) {
        value['hour'] = date.getHours()
        value['minute'] = date.getMinutes()
      }
      model[name] = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear()
    }
  };

  render () {
    const { label, required, showTime } = this.props
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
      dateLabel = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
    const mode = showTime? "datetime" : "date"
    return (
      <View style={ AppStyles.dateTimeInput }>
        <Text>{ text }</Text>
        <Button onPress={this._showDateTimePicker} title={ dateLabel }/>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker} mode={ mode }
        />
      </View>
    );
  }
}
