import React, { Component } from 'react';
import { Text, View } from 'react-native'
import CheckBox from 'react-native-checkbox'

export default class SelectOneField extends Component {

  render() {
    const { label, options } = this.props
    var checkBoxes = []
    if(options != null) {
      checkBoxes = options.map((option, index) => {
        if(typeof option == "object") {
          return <CheckBox label={ option.label } key={ index }/>
        } else {
          return <CheckBox label={ option } key={ index }/>
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
