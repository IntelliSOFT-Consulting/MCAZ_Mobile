import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import StudyDrugsTableComponent from '../components/StudyDrugsTableComponent'
import ConcomitantMedTableComponent from '../components/ConcomitantMedTableComponent'
import LabsTableComponent from '../components/LabsTableComponent'

export default class SectionCScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
          their relationship to the SAE:</Text>
        <StudyDrugsTableComponent />
        <SelectOneField label="9. Was the patient taking any other drug at the time of onset of the AE?" />
        <Text>10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the
          relationship to the SAE:</Text>
        <ConcomitantMedTableComponent />
        <Text>11. Has the Adverse Event been
          reported to:</Text>
        <SelectOneField label="(a) MCAZ" />
        <SelectOneField label="(b) MRCZ" />
        <SelectOneField label="(c) Sponsor" />
        <SelectOneField label="(d) IRB" />
        <Text>If YES, Date of reports:</Text>
        <TextInputField label="(a) MCAZ"/>
        <TextInputField label="(b) MRCZ"/>
        <TextInputField label="(c) Sponsor"/>
        <TextInputField label="(d) IRB"/>
        <Text>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
          results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
          results of abnormal investigations and a hospital discharge letter may be attached:</Text>
        <TextInputField label="Summary of relevant past medical history of participant" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(a) Diagnosis" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(b) Immediate Cause" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(c) Symptoms" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(d) Investigations-Laboratory and any other significant
          investigations conducted:" multiline = {true}
          numberOfLines = {4}/>
        <LabsTableComponent />
        <TextInputField label="(e) Results:" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(f) Management (Include management of study treatment, continued,
            temporarily held, reduced dose, permanent discontinuation, off Product):" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="(g) Outcome:" multiline = {true}
          numberOfLines = {4}/>
        <Text>NB If the outcome is death, please complete &amp; attach the death form.</Text>
      </ScrollView>
    )
  }
}
