import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionDScene extends PureComponent {

  render() {
    const { model, saveAndContinue, saveAndSubmit, cancel, validate } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" model={ model } name="d1_consent_form" options={["Yes", "No"]}/>
        <SelectOneField label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" model={ model } name="d2_brochure" options={["Yes", "No"]}/>
        <SelectOneField label="D3. Are changes required to the protocol as a result of this SAE?" model={ model } name="d3_changes_sae" options={["Yes", "No"]}/>
        <SelectOneField label="D4. Are changes required to the consent form as a result of this SAE?" model={ model } name="d4_consent_sae" options={["Yes", "No"]}/>
        <Text>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</Text>
        
        <TextInputField label="If changes are not required, please explain as to why changes to the protocol /consent
          form are not necessary based on the event." multiline = {true} numberOfLines = {4} model={ model } name="changes_explain"/>

        <SelectOneField label="From the data obtained or from currently available information, do you see any need to reassess the
          risks and benefits to the subjects in this research." model={ model } name="assess_risk" options={ ["Yes", "No"] }/>


        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
