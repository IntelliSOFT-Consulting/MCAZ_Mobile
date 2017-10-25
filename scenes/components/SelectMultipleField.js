import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native'
import CheckBox from 'react-native-check-box'

export default class SelectMultipleField extends Component {

  constructor(props) {
    super(props)
    const { options } = this.props
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
    this.state = state
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(option, index) {
    const { options, name, model } = this.props
    var state = this.state
    if(typeof option == "object") {
      state[option.key] = !state[option.key]
    } else {
      state[index] = !state[index]
    }
    this.setState(state)
    if(model) {
      model[name] = this.state.value
    }
    //this.setState(state)
  }

  render() {
    const { label, options } = this.props
    var checkBoxes = []
    if(options != null) {
      checkBoxes = options.map((option, index) => {
        if(typeof option == "object") {
          return  <CheckBox rightText={ option.label } key={ index } isChecked={ this.state[option.key] } onClick={ () => this.handleCheck(option) }/>
        } else {
          return <CheckBox rightText={ option } key={ index } isChecked={ this.state[index] } onClick={ () => this.handleCheck(option, index) }/>
        }
      })
    }
    return (
      <View>
        <Text>{ label }</Text>
          { checkBoxes }
      </View>
    )
  }
}
