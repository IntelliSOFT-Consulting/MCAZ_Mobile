import React, { Component } from 'react';
import { Text, Appearance, View, Button, Platform } from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { CustomModal } from '../modal';

export default class DateTimeInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, showTime } = this.props
    var value = undefined
    let dateVal = undefined
    if(model) {
      if(model[name]) {
        let date = new Date(model[name]);
        if (!(date instanceof Date && !isNaN(date))) {
          const v = model[name].split('-');
          value = new Date();
          value.setDate(v[0])
          value.setMonth(parseInt(v[1]) - 1)
          value.setYear(v[2])
          dateVal = value;
          if (showTime) {
            value = moment(value).format('DD-MM-YYYY HH:mm')
          } else {
            value = moment(value).format('DD-MM-YYYY')
          }
          // return `${this.pad(parts[0])}-${this.pad(parts[1])}-${parts[2]}`;
        } else {
          value = date;
          dateVal = date;
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
      date : value,
      dateVal,
      value: dateVal
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _toggleDateTimePicker = (visibility) => this.setState({ isDateTimePickerVisible: visibility });

  _handleDatePicked = (date) => {
    //if (Platform.OS === 'android') {
      // this._hideDateTimePicker()
    //};
    if (!date) {
      return;
    }
    const pad = (value) => {
      if (value < 10) {
        return `0${value}`;
      }
      return value
    }
    
    const { name, showTime } = this.props;
    const model = {};
    let display;
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
      display = mode === 'time' ? model[name] : showTime ? moment(date).format('DD-MM-YYYY HH:mm') : moment(date).format('DD-MM-YYYY');
      this.setState({ isDateTimePickerVisible: false, dateVal: date  })
    }
    
    const { onChange, index, handleModelChange } = this.props
    if (handleModelChange) {
      handleModelChange(model);
    } else if(onChange) {
      var value = {}
      value[name] = date
      onChange(model, index)
    } else {
      this.setState({ date: display });
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { date } = state;
    const { model, name } = props;
    if (model[name] != null && date != model[name]) {
      return { date: model[name] };
    }
    return null;
  }

  getDate = (d) => {
    if (typeof d === 'object') {
      return d;
    }
    const p = d.split('-');
    return new Date(`${p[1]}-${p[0]}-${p[2]}`)
  }

  render () {
    const { label, required, showTime, maxDate, minDate, model, name, hideLabel } = this.props
    const { date, isDateTimePickerVisible, dateVal, value } = this.state;
    const colorScheme = Appearance.getColorScheme();
    const isDarkMode = colorScheme === 'dark';
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

    const maxDateVal = maxDate ? maxDate : undefined
    const minimumDate = minDate ? this.getDate(minDate) : undefined
    return (
      <View style={ AppStyles.dateTimeInput }>
        {!hideLabel && (<Text>{ text }</Text>)}
        <Button
          onPress={() => this._toggleDateTimePicker(!isDateTimePickerVisible)}
          title={ dateLabel }
          style={{ color: '#ffffff' }}
        />
        {isDateTimePickerVisible && Platform.OS !== 'ios' && (
          <DateTimePicker
            value={ dateVal ? dateVal : new Date() }
            datePickerModeAndroid="spinner"
            minimumDate={ minimumDate }
            maximumDate={ maxDateVal }
            onChange={(e,d) => this._handleDatePicked(d)}
            onCancel={this._hideDateTimePicker}
            mode={ mode }
          />
        )}
        {Platform.OS === 'ios' && (
          <CustomModal
            onCancel={() => {
              this.setState({ value: new Date(), isDateTimePickerVisible : false });
            }}
            visible={isDateTimePickerVisible}
            onConfirm={() => {
              this._handleDatePicked(value);
            }}
            containerStyle={{
              backgroundColor: '#ffffff',
              maxWidth: 600,
            }}
            body={
              <DateTimePicker
                style={{
                  minWidth: '100%',
                  backgroundColor: '#ffffff',
                  minHeight: 30,
                }}
                testID="dateTimePicker"
                value={value || new Date()}
                is24Hour={true}
                mode={mode}
                display={"inline"}
                minimumDate={ minimumDate }
                maximumDate={ maxDateVal }
                onChange={(e, d) => {
                  if (d) {
                    this.setState({ value: d });
                  }
                }}
              />
            }
          />
        )}
      </View>
    );
  }
}
