import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native'
import CheckBox from 'react-native-checkbox'
import { Dropdown } from 'react-native-material-dropdown';

export default class SelectOneField extends Component {

  constructor(props) {
    super(props)
    const { options, model, name } = this.props
    //var state = {}
    var value = "", label = ""
    if(model && model[name]) {
      value = model[name]
      const selected = options.find((option) => option.key == value || option == value )
      label = selected.value
    }

    this.state = { value : value, label : label }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(itemValue, itemIndex) {
    const { options, name, model } = this.props
    const option = options[itemIndex]
    var value = null
    if(typeof option == "object") {
      this.setState({ value : option.key })
      value = option.key
    } else {
      this.setState({ value : option })
      value = option
    }
    if(model) {
      model[name] = value
    }
    this.setState({ value })
  }

  render() {
    const { label, options, required, hideLabel } = this.props
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

    text = (hideLabel || label == null)? null : text
    return (
      <View>
        { text }
        <Dropdown
          label='' labelHeight={ 0 } onChangeText={ this.handleChange }
          data={ options } value={ this.state.label }
        />
      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { model, name, options } = this.props
    var {value} = this.state
    const newModel = nextProps.model
    if(value != newModel[name] && newModel[name]) {
      value = newModel[name]
      const selected = options.find((option) => option.key == value || option == value )
      label = selected.value
      this.setState({ value,label })
    }
  }
}

/*
<Picker selectedValue={this.state.value}  onValueChange={ (itemValue, itemIndex) => this.handleChange(itemValue, itemIndex) }>
  { checkBoxes }
</Picker>
*/
