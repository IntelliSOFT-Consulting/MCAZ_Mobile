/*import React, { Component } from 'react';
import { Text, View } from 'react-native'
import CheckBox from 'react-native-check-box'

export default class CheckBoxInput extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(name && model) {
      value = model[name]
    }
    this.state = { checked : (value == "1") ? true : false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    var { checked } = this.state
    var { name, model } = this.props
    if(model) {
      model[name] = !checked? "1" : "0"
    }
    this.setState({ checked : !checked })
  }

  render() {
    const { label } = this.props
    return (
      <View>
        <CheckBox {...this.props} onClick={ () => this.handleChange()} isChecked={ this.state.checked } />
      </View>
    )
  }
}*/

import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
// import { AppStyles } from '../AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { Colors } from '../Colors';

/*interface Props {
  label: string;
  inputType: 'radio' | 'checkbox';
  checked: boolean;
  hasError: boolean;
  handleChange?: (checked: boolean) => void;
}*/

const CheckBoxInput = (props) => {
  const { model, name } = props;
  const [checked, setChecked] = useState(model && model[name] === '1' ? true : false);

  const onPressed = () => {
    const { name, model } = props
    if(model) {
      model[name] = !checked? "1" : "0"
    }
    setChecked(!checked);
  };

  const getInputIcon = () => {
    if (props.inputType === 'radio') {
      return checked ? 'radio-button-checked' : 'radio-button-unchecked';
    } else {
      return checked ? 'check-box' : 'check-box-outline-blank';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressed}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon
        // color={props.hasError ? Colors.red : Colors.primary}
        name={getInputIcon()}
        size={28}
      />
      <View style={{ flex: 1 }}>
        <Text>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBoxInput;