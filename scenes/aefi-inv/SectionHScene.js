import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'


export default class SectionHScene extends PureComponent {

  render() {
    const { model, saveAndContinue, saveAndSubmit, cancel, validate } = this.props
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <TextInputField name="relevant_findings" label="Other comments:" multiline={true} numberOfLines={4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
