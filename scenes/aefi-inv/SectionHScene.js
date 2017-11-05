import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionHScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="Other comments:" multiline={true} numberOfLines={4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
