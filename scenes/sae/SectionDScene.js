import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import FileAttachmentComponent from '../components/FileAttachmentComponent'

import { BOOLEAN_OPTIONS, BOOLEAN_NA_OPTIONS } from '../../utils/FieldOptions'

export default class SectionDScene extends PureComponent {

  state = {}
  constructor(props, context) {
    super(props,context)
  }

  render() {
    const { model, saveAndContinue, saveAndSubmit, cancel, validate } = this.props
    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] }>
        <SelectOneField label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" model={ model } validate={ this.state.validate } required={ true } name="d1_consent_form" options={ BOOLEAN_NA_OPTIONS }/>
        <SelectOneField label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" model={ model } validate={ this.state.validate } required={ true } name="d2_brochure" options={ BOOLEAN_NA_OPTIONS }/>
        <SelectOneField label="D3. Are changes required to the protocol as a result of this SAE?" model={ model } validate={ this.state.validate } required={ true } name="d3_changes_sae" options={ BOOLEAN_NA_OPTIONS }/>
        <SelectOneField label="D4. Are changes required to the consent form as a result of this SAE?" model={ model } validate={ this.state.validate } required={ true } name="d4_consent_sae" options={ BOOLEAN_NA_OPTIONS }/>
        <FileAttachmentComponent model={ model } name="attachments" label="Attach any files"/>
        <Text>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</Text>

        <Text>If changes are not required, please explain as to why changes to the protocol /consent
          form are not necessary based on the event.</Text>
        <TextInputField label="" multiline = {true} numberOfLines = {4} model={ model } validate={ this.state.validate } required={ true } name="changes_explain" tintColor="rgba(0, 0, 0, .60)"/>

        <SelectOneField label="From the data obtained or from currently available information, do you see any need to reassess the
          risks and benefits to the subjects in this research." model={ model } validate={ this.state.validate } required={ true } name="assess_risk" options={  BOOLEAN_OPTIONS  }/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } color="#841584"  title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } color="#841584"  title="Save and Submit"/>
          <Button onPress={ () => cancel() } color="#841584"  title="Cancel"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
