import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native'
import CheckBox from 'react-native-checkbox'

export default class SelectOneField extends Component {

  constructor(props) {
    super(props)
    const { options, model, name } = this.props
    //var state = {}
    var value = ""
    if(model && model[name]) {
      value = model[name]
    }
    this.state = { value : "" }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(itemValue, itemIndex) {
    const { options, name, model } = this.props
    const option = options[itemIndex]
    if(typeof option == "object") {
      this.setState({ value : option.key })
    } else {
      this.setState({ value : option })
    }
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
          return  <Picker.Item key={ index } label={ option.label } value={ option.key } /> //<CheckBox label={ option.label } key={ index } checked={ this.state[option.key] } onChange={ (checked) => this.handleCheck(checked) }/>
        } else {
          return <Picker.Item key={ index } label={ option } value={ option } /> //<CheckBox label={ option } key={ index } checked={ this.state[index] } onChange={ (checked) => this.handleCheck(checked) }/>
        }
      })
    }
    return (
      <View>
        <Text>{ label }</Text>
        <Picker selectedValue={this.state.value}  onValueChange={ (itemValue, itemIndex) => this.handleChange(itemValue, itemIndex) }>
          { checkBoxes }
        </Picker>

      </View>
    )
  }
}
