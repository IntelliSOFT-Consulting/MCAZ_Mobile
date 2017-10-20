import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'

export default class TextInputField extends Component {

  render() {
    const { label } = this.props
    return (
      <View>
        <Text>{ label }</Text>
        <TextInput {...this.props} />
      </View>
    )
  }
}
