import React, { Component } from 'react';
import {
   Modal,
   Text,
   TouchableHighlight,
   View,
   StyleSheet
} from 'react-native'

import AppStyles from '../../styles/AppStyles'

class ReportTypeModal extends Component {

  constructor(props, context) {
    super(props, context)
    const { visible } = this.props
    this.state = { visible : visible }
  }

  render() {
    return (
      
    )
  }

  componentWillRecieveProps(nextProps) {
    this.setState({ visible: nextProps.visible })
  }
}
