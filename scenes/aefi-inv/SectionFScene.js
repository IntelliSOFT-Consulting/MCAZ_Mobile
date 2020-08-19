import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, BOOLEAN_UNABLE_OPTIONS } from '../../utils/FieldOptions'

export default class SectionFScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        <Text>(Complete this section by asking and/or observing practice)</Text>
        <Text>Last vaccine storage point:</Text>
        <SelectOneField model={ model } name="cold_temperature" options={ BOOLEAN_OPTIONS } label="Is the temperature of the vaccine storage refrigerator monitored?" />
        <SelectOneField model={ model } name="cold_temperature_deviation" options={ BOOLEAN_OPTIONS } label="If “yes”, was there any deviation outside of 2-8 ° C after the vaccine was placed inside?" />
        <TextInputField model={ model } name="cold_temperature_specify" label="If “yes”, provide details of monitoring separately."/>
        <SelectOneField model={ model } name="procedure_followed" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was the correct procedure for storing vaccines, diluents and syringes followed?" />
        <SelectOneField model={ model } name="other_items" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" />
        <SelectOneField model={ model } name="partial_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any partially used reconstituted vaccines in the refrigerator?" />
        <SelectOneField model={ model } name="unusable_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" />
        <SelectOneField model={ model } name="unusable_diluents" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" />
        <TextInputField model={ model } name="additional_observations" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Vaccine transportation from the refrigerator to the vaccination centre:</Text>
        <SelectOneField model={ model } name="cold_transportation" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was cold chain properly maintained during transportation?" />
        <SelectOneField model={ model } name="vaccine_carrier" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was the vaccine carrier sent to the site on the same day as vaccination?" />
        <SelectOneField model={ model } name="coolant_packs" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were conditioned coolant-packs used?" />
        <TextInputField model={ model } name="transport_findings" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(7) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
