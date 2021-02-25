import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native'
import CheckBox from 'react-native-check-box'

export default class SelectMultipleField extends Component {

  constructor(props) {
    super(props)
    const { options, model } = this.props
    var state = {}
    if(options && typeof options == "array") {
      for(let i = 0; i < options.length; i++) {
        const option = options[i]
        if(typeof option == "object") {
          state[option.key] = false
        } else {
          state[i] = false
        }
      }
    }
    state.model = model
    this.state = state
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(option, index) {
    const { options, name } = this.props
    var modelProp = this.props.model
    var { model } = this.state
    if(typeof option == "object") {
      model[option.key] = model[option.key] == "1"? "0" : "1"
      modelProp[option.key] = model[option.key]
      const keys = Object.keys(model)
      const selected = keys.filter(key => model[key] == "1")
      modelProp[name] = selected.join(",")
    } else {
      model[index] = !model[index]
    }
    this.setState(model)
  }

  render() {
    const { label, options, required } = this.props
    var checkBoxes = []
    if(options != null) {
      checkBoxes = options.map((option, index) => {
        if(typeof option == "object") {
          return  <CheckBox rightText={ option.value } key={ index } isChecked={ this.state.model[option.key] == "1" } onClick={ () => this.handleCheck(option) }/>
        } else {
          return <CheckBox rightText={ option } key={ index } isChecked={ this.state[index] } onClick={ () => this.handleCheck(option, index) }/>
        }
      })
    }
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
    return (
      <View>
        {text}
          { checkBoxes }
      </View>
    )
  }
}
