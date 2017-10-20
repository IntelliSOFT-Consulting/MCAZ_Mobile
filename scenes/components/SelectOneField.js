import React, { Component } from 'react';
import { Text, View, CheckBox } from 'react-native'

export default class SelectOneField extends Component {

  render() {
    const { label, options } = this.props
    var checkBoxes = []
    if(options != null) {
      checkBoxes = options.map((option) => {
        return <CheckBox />
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
