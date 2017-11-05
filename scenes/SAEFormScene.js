import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import StudyDrugsTableComponent from './components/StudyDrugsTableComponent'
import ConcomitantMedTableComponent from './components/ConcomitantMedTableComponent'
import LabsTableComponent from './components/LabsTableComponent'

import AppStyles from '../styles/AppStyles'

export default class SAEFormScene extends Component {
  static navigationOptions = {
    title: 'SAE Report form',
  }

  constructor(props, context) {
    super(props, context)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  saveAndContinue() {

  }

  saveAndSubmit() {

  }

  cancel() {

  }

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MRCZ Protocol #:"/>
        <TextInputField label="MCAZ Protocol #"/>
        <TextInputField label="Institution"/>
        <TextInputField label="Principle Investigator:"/>
        <TextInputField label="Phone:" keyboardType = 'email-address'/>
        <TextInputField label="Email:" keyboardType = 'phone-pad' />
        <TextInputField label="Report prepared by:"/>
        <TextInputField label="Designation in the study:"/>
        <TextInputField label="Date Form completed"/>
        <TextInputField label="Study Title:"/>
        <TextInputField label="Study Sponsor:"/>
        <TextInputField label="Date of Adverse Event:"/>
        <TextInputField label="Participant ID:" />
        <SelectOneField label="Hosp. Num.:"/>
        <SelectOneField label="Date of Site Awareness:"/>
        <TextInputField label="Date of Birth:" />
        <SelectOneField label="Sex:" />
        <SelectOneField label="Type of Report:" />
        <TextInputField label="Study week:-"/>
        <TextInputField label="Visit number:-"/>
        <Text style={ AppStyles.boldText }>B</Text>
        <SelectOneField label="1. What type of adverse event is this?" options={ ["one", "two"]}/>
        <SelectOneField label="2a. If SAE, is it:" options={ ["one", "two"]}/>
        <SelectOneField label="2b. Toxicity Grade:"/>
        <SelectOneField label="3a. Any previous Adverse Event’s report on this participant?:"/>
        <TextInputField label="If yes, how many?"/>
        <SelectOneField label="3b. Total Number of SAEs to date for the whole study:" />
        <SelectOneField label="4. Location of the current Adverse Event:" />
        <SelectOneField label="5. Research involves a:" />
        <SelectOneField label="6. Name of Drug, Device or Procedure:"/>
        <SelectOneField label="7. Is the drug/device investigational:" />

        <Text style={ AppStyles.boldText }>C</Text>
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

        <Text>D</Text>
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
    );
  }
}
