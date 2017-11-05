import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionFScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>(Complete this section by asking and/or observing practice)</Text>
        <Text>Last vaccine storage point:</Text>
        <SelectOneField label="Is the temperature of the vaccine storage refrigerator monitored?" options={ ["Yes", "No"] }/>
        <SelectOneField label="If “yes”, was there any deviation outside of 2-8 ° C after the vaccine was placed inside?" options={ ["Yes", "No"] }/>
        <TextInputField label="If “yes”, provide details of monitoring separately."/>
        <SelectOneField label="Was the correct procedure for storing vaccines, diluents and syringes followed?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any partially used reconstituted vaccines in the refrigerator?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" options={ ["Yes", "No"] }/>
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Vaccine transportation from the refrigerator to the vaccination centre:</Text>
        <SelectOneField label="Was cold chain properly maintained during transportation?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Was the vaccine carrier sent to the site on the same day as vaccination?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were conditioned coolant-packs used?" options={ ["Yes", "No"] }/>
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
      </ScrollView>
    )
  }
}
