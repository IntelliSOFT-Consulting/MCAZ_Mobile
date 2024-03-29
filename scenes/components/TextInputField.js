import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import AppStyles from '../../styles/AppStyles'

import { TextField } from 'react-native-material-textfield'

export default class TextInputField extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(name && model && model[name]) {
      value = model[name]
    }
    this.state = { value : value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    var { name, model, handleModelChange, onChange } = this.props;
    if (handleModelChange) {
      handleModelChange({ [name]: value });
    } else if (onChange) {
      onChange({ [name]: value })
    } else {
      model[name] = value
    }
  }

  render() {
    const { label, required, validate, hideLabel, tintColor, numberOfLines } = this.props
    const { value } = this.state
    var text = null
    if(required) {
      const colorLabel = (value == "" && validate)? AppStyles.required : {}
      text = (
        <Text style={ colorLabel }>{ label } <Text style={ AppStyles.required }>*</Text></Text>
      )
    } else {
      text =(
        <Text>{ label }</Text>
      )
    }
    const labelText = label ? text : ""
    const labelHeight = hideLabel ? 0 : undefined
    const tintColorValue = tintColor == null ? "rgb(0, 145, 234)" : tintColor
    return (
      <View>
        {!hideLabel && (
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{labelText}</Text>
        )}
        <TextInput
          keyboardType={this.props.keyboardType}
          label={ '' } labelHeight={ labelHeight }
          value={ this.state.value }
          multiline={true}
          numberOfLines={numberOfLines}
          style={{ borderWidth: 1, borderColor: '#f0f0f0', paddingLeft: 5, color: '#000', backgroundColor: 'fff'}}
          onChangeText={ (text) => this.handleChange(text) } tintColor={ tintColorValue }
        />
      </View>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const { value } = state;
    const { model, name } = props;
    if (model[name] != null && value != model[name]) {
      return { value: model[name] };
    }
    return null;
  }
  /*componentWillReceiveProps(nextProps) {
    const { model, name } = this.props
    var { value } = this.state
    const newModel = nextProps.model
    if(value != newModel[name] && newModel[name] != null) {
      const val = newModel[name]
      this.setState({ value : val })
    }
  }*/
}
// { text }
// <TextInput {...this.props} onChangeText={(text) => this.handleChange(text)} value={ this.state.value }/>
