import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimeInput extends Component {


  constructor(props) {
    super(props)
    const { model, name } = this.props
    this.state = {
      isDateTimePickerVisible: false,
      date : new Date()
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
    const { label } = this.props
    const { date } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this._showDateTimePicker} title={ label + " " + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() }/>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker} date={ this.state.date }
        />
      </View>
    );
  }
}
