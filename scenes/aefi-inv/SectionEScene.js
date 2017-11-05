import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionEScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>(Complete this section by asking and/or observing practice)</Text>

        <Text>Syringes and needles used:</Text>
        <SelectOneField label="Are AD syringes used for immunization?" />
        <SelectOneField label="If no, specify the type of syringes used:" />
        <TextInputField label="Other" />
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Reconstitution: (complete only if applicable,  NA if not applicable)</Text>
        <Text>Reconstitution procedure ()</Text>
        <SelectOneField label="Same reconstitution syringe used for multiple vials of same vaccine?" />
        <SelectOneField label="Same reconstitution syringe used for reconstituting different vaccines?" />
        <SelectOneField label="Separate reconstitution syringe for each vaccine vial?" />
        <SelectOneField label="Separate reconstitution syringe for each vaccination?" />

        <SelectOneField label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" />
        <TextInputField label="Specific key findings/additional observations and comments:" multiline = {true} numberOfLines = {4}/>
      </ScrollView>
    )
  }
}
