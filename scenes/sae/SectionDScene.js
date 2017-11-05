import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionDScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" />
        <SelectOneField label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" />
        <SelectOneField label="D3. Are changes required to the protocol as a result of this SAE?" />
        <SelectOneField label="D4. Are changes required to the consent form as a result of this SAE?" />

        <TextInputField label="If changes are not required, please explain as to why changes to the protocol /consent
          form are not necessary based on the event." multiline = {true} numberOfLines = {4}/>

        <SelectOneField label="From the data obtained or from currently available information, do you see any need to reassess the
          risks and benefits to the subjects in this research." options={ ["Yes", "No"] }/>

        <TextInputField label="Date"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
