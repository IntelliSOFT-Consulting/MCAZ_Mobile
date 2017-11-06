import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimeInput extends Component {
  state = {
    isDateTimePickerVisible: false,
    date : ""
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ date : date })
    this._hideDateTimePicker();
  };

  render () {
    const { label } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this._showDateTimePicker} title={ label + " " + this.state.date }/>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
