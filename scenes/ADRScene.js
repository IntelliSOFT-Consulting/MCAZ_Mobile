import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'

import AppStyles from '../styles/AppStyles'

export default class ADRScene extends Component {
  static navigationOptions = {
    title: 'ADR Report form',
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
      <ScrollView style={ AppStyles.container }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MCAZ Reference Number (MCAZ use only)"/>
        <Text style={ AppStyles.boldText }>Patient Details</Text>
        <TextInputField label="Clinical/Hospital Name :"/>
        <TextInputField label="Clinical/Hospital Number :"/>
        <TextInputField label="Patient Initials:"/>
        <TextInputField label="VCT/OI/TB Number"/>
        <TextInputField label="Date of birth"/>
        <TextInputField label="Weight(Kg)"/>
        <TextInputField label="Age"/>
        <TextInputField label="Height(meters)"/>
        <TextInputField label="Sex"/>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <TextInputField label="Date of onset"/>
        <TextInputField label="Duration"/>
        <TextInputField label="Description of ADR" multiline = {true}
         numberOfLines = {4}/>
        <SelectOneField label="Serious"/>
        <SelectOneField label="Reason for Seriousness"/>
        <TextInputField label="Relevant medical history" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="Relevant Past Drug Therapy" multiline = {true}
          numberOfLines = {4}/>
        <TextInputField label="Laboratory test results" multiline = {true}
          numberOfLines = {4}/>
        <Text style={ AppStyles.boldText }>Current Medication</Text>

        <SelectOneField label="Action taken:"/>
        <SelectOneField label="Outcome of ADR:"/>
        <SelectOneField label="Relatedness of suspected medicine(s) to ADR:"/>

        <Text style={ AppStyles.boldText }>Reported by</Text>
        <TextInputField label="Forename(s) and Surname:"/>
        <TextInputField label="Designation:"/>
        <TextInputField label="Email Address:" keyboardType = 'email-address'/>
        <TextInputField label="Phone number" keyboardType = 'phone-pad'/>
        <TextInputField label="Name &amp; Address of Institution" />
        <Button onPress={ this.saveAndContinue } title="Save changes"/>
        <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
        <Button onPress={ this.cancel } title="Cancel"/>
      </ScrollView>
    );
  }
}
