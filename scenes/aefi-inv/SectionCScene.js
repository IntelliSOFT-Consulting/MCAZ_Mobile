import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class SectionCScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <SelectOneField label="Source of information" />
        <TextInputField label="Other"/>
        <TextInputField label="If from verbal autopsy, please mention source"/>
        <TextInputField label="Name of the person who first examined/treated the patient:"/>
        <TextInputField label="Other sources who provided information (specify):"/>
        <TextInputField label="Name of patient:" />
        <TextInputField label="AEFI Report ID:" />
        <TextInputField label="Signs and symptoms in chronological order from the time of vaccination:" />
        <TextInputField label="Name and contact information of person completing these clinical details:" />
        <TextInputField label="Designation:" />
        <TextInputField label="Date/time"/>
        <Text style={ AppStyles.boldText }>
          **Instructions – Attach copies of ALL available documents (including case sheet, discharge summary, case notes,
          laboratory reports and autopsy reports) and then complete additional information NOT AVAILABLE in
          existing documents, i.e.
        </Text>
        <Text>If patient has received medical care  attach copies of all available documents (including case sheet, discharge
          summary, laboratory reports and autopsy reports, if available) and write only the information that is not
          available in the attached documents below
        </Text>
        <Text>
          If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
          additional sheets if necessary)
        </Text>
        <Text>
          Provisional / Final diagnosis:
        </Text>
      </ScrollView>
    )
  }
}
