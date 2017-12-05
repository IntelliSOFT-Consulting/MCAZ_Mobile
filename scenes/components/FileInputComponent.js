import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native'

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob'

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

  selectFile() {
    const { model } = this.props
    DocumentPicker.show({
      filetype: [ DocumentPickerUtil.allFiles() ],
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
      model['filename'] = res.fileName
      RNFetchBlob.fs.readFile(res.uri, 'base64')
      .then((data) => {
        model['file'] = 'data:' + res.type + ';base64,' + data
        this.setState({ filename : model['filename']})
      })
    });
  }
  render() {
    const { model } = this.props
    
    return (
      <View>
        <Text>{ this.state.filename }</Text>
        <Button onPress={ this.selectFile } title="Select file"/>
      </View>
    )
  }
}
