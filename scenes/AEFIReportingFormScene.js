import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'


import AppStyles from '../styles/AppStyles'

export default class AEFIReportingFormScene extends Component {
  static navigationOptions = {
    title: 'AEFI Reporting Form',
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

        <TextInputField label="*Patient first name:"/>
        <TextInputField label="Surname"/>
        <TextInputField label="Next of Kin:"/>
        <TextInputField label="*Patient’s physical address:"/>
        <TextInputField label="Telephone:" keyboardType="phone-pad"/>
        <SelectOneField label="Sex:"/>
        <TextInputField label="*Date of birth (DD/MM/YYYY):"/>
        <TextInputField label="OR Age at onset"/>
        <TextInputField label="*Reporter’s Name:"/>
        <TextInputField label="Designation, Department &amp; address:"/>

        <TextInputField label="District:"/>
        <TextInputField label="Province:"/>
        <TextInputField label="Telephone &amp; e-mail:"/>
        <TextInputField label="Today’s date (DD/MM/YYYY):"/>
        <TextInputField label="Name of vaccination centre:"/>
        <Text>Table</Text>
        <SelectOneField label="*Adverse event (s):" />

        <TextInputField label="Other" />
        <TextInputField label="Date patient notified event to health system (DD/MM/YYYY):" />

        <SelectOneField label="Treatment provided:" options={ ["one", "two"]}/>
        <SelectOneField label="*Serious:" options={ ["one", "two"]}/>
        <SelectOneField label="If yes:" options={ ["one", "two"]}/>
        <TextInputField label="*Outcome:"/>
        <TextInputField label="If died, date of death (DD/MM/YYYY)::"/>
        <SelectOneField label="Autopsy done:" />
        <TextInputField label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information
          (e.g. other cases). Use additional sheet if needed :" multiline={true} numberOfLines={4}/>
        <Text>First decision making level to complete (District level):</Text>
        <TextInputField label="Date report received at district level (DD/MM/YYYY):" />
        <SelectOneField label="Investigation needed:" options={ ["one", "two"]}/>
        <TextInputField label="If yes, date investigation planned (DD/MM/YYYY):" />
        <Text>National level to complete:</Text>
        <TextInputField label="Date report received at national level (DD/MM/YYYY):" />
        <TextInputField label="Comments:" />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    );
  }
}
