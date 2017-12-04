import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import FileAttachmentComponent from '../components/FileAttachmentComponent'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS } from '../../utils/FieldOptions'

export default class SectionDScene extends PureComponent {

  state = {}
  constructor(props, context) {
    super(props,context)
  }

  render() {
    const { model, saveAndContinue, saveAndSubmit, cancel, validate } = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] }>
        <SelectOneField label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" model={ model } validate={ this.state.validate } required={ true } name="d1_consent_form" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <SelectOneField label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" model={ model } validate={ this.state.validate } required={ true } name="d2_brochure" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <SelectOneField label="D3. Are changes required to the protocol as a result of this SAE?" model={ model } validate={ this.state.validate } required={ true } name="d3_changes_sae" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <SelectOneField label="D4. Are changes required to the consent form as a result of this SAE?" model={ model } validate={ this.state.validate } required={ true } name="d4_consent_sae" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <FileAttachmentComponent model={ model } name="files" label="Attach any files"/>
        <Text>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</Text>

        <TextInputField label="If changes are not required, please explain as to why changes to the protocol /consent
          form are not necessary based on the event." multiline = {true} numberOfLines = {4} model={ model } validate={ this.state.validate } required={ true } name="changes_explain"/>

        <SelectOneField label="From the data obtained or from currently available information, do you see any need to reassess the
          risks and benefits to the subjects in this research." model={ model } validate={ this.state.validate } required={ true } name="assess_risk" options={  BOOLEAN_OPTIONS  }/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
