import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'

export default class LoadingScene extends Component {

  constructor(props) {
    super(props)
    const { value, name } = this.props

    this.state = { value : value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    var { name, model } = this.props
    if(model) {
      model[name] = value
    }
  }

  render() {
    const { label } = this.props
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}
