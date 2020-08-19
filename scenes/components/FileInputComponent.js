import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'

import DocumentPicker from 'react-native-document-picker';
const RNFS = require('react-native-fs');

export default class FileInputComponent extends Component{

  constructor(props, context) {
    super(props, context)
    this.selectFile = this.selectFile.bind(this)

    const { model } = this.props
    var filename = null
    if(model['filename']) {
      filename = model['filename']
    }
    this.state = { filename : filename }
  }

  async selectFile() {
    const { model } = this.props
    try {
      const res = await DocumentPicker.pick({
        // type: DocumentPicker.allFiles
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
     );
     model['filename'] = res.name;
     RNFS.readFile(res.uri, 'base64').then((data) => {
       model['file'] = 'data:' + res.type + ';base64,' + data
       this.setState({ filename : model['filename']})
     });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
      console.error(err);
    }
  }
  render() {
    const { hideLabel, label } = this.props
    const labelText = hideLabel ? null : (<Text>{ label }</Text>)
    return (
      <View>
        { labelText }
        <Text>{ this.state.filename }</Text>
        <Button onPress={ this.selectFile } title="Select file"/>
      </View>
    )
  }
}
