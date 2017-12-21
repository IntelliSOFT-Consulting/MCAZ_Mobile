import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, SYRINGES_USED, BOOLEAN_NA_OPTIONS } from '../../utils/FieldOptions'

export default class SectionEScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] }>
        <Text>(Complete this section by asking and/or observing practice)</Text>

        <Text>Syringes and needles used:</Text>
        <SelectOneField label="Are AD syringes used for immunization?" model={ model } name="syringes_used" options={ BOOLEAN_UNKNOWN_OPTIONS }/>
        <SelectOneField label="If no, specify the type of syringes used:" model={ model } name="syringes_used_specify" options={ SYRINGES_USED }/>
        <TextInputField label="Other" model={ model } name="syringes_used_other"/>
        <TextInputField model={ model } name="syringes_used_findings" label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Reconstitution: (complete only if applicable,  NA if not applicable)</Text>
        <Text>Reconstitution procedure ()</Text>
        <SelectOneField model={ model } name="reconstitution_multiple" options={ BOOLEAN_NA_OPTIONS } label="Same reconstitution syringe used for multiple vials of same vaccine?" />
        <SelectOneField model={ model } name="reconstitution_different" options={ BOOLEAN_NA_OPTIONS } label="Same reconstitution syringe used for reconstituting different vaccines?" />
        <SelectOneField model={ model } name="reconstitution_vial" options={ BOOLEAN_NA_OPTIONS } label="Separate reconstitution syringe for each vaccine vial?" />
        <SelectOneField model={ model } name="reconstitution_syringe" options={ BOOLEAN_NA_OPTIONS } label="Separate reconstitution syringe for each vaccination?" />

        <SelectOneField model={ model } name="reconstitution_vaccines" label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" options={ BOOLEAN_NA_OPTIONS }/>
        <TextInputField model={ model } name="reconstitution_observations" multiline={ true } label="Specific key findings/additional observations and comments:" multiline = {true} numberOfLines = {4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(6) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
