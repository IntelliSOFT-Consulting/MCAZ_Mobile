import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import DateTimeInput from '../components/DateTimeInput'
import SelectMultipleField from '../components/SelectMultipleField'
import SAEDrugsTableComponent from '../components/SAEDrugsTableComponent'
import SAEConcomitantTableComponent from '../components/SAEConcomitantTableComponent'
import LabsTableComponent from '../components/LabsTableComponent'

import { BOOLEAN_OPTIONS, OUTCOME } from '../../utils/FieldOptions'
import CheckBoxInput from '../components/CheckBoxInput';

export default class SectionCScene extends PureComponent {
  state = {}
  constructor(props, context) {
    super(props,context)
    this.onOtherDrugsChange = this.onOtherDrugsChange.bind(this)
    this.onOptionChange = this.onOptionChange.bind(this);
    this.state = {
      otherDrugs: 'No'
    }
  }

  onOtherDrugsChange(otherDrugs) {
    if (otherDrugs.patient_other_drug === 'No') {
      const { model } = this.props;
      model['adr_other_drugs'] = []
    }
    this.setState({ otherDrugs: otherDrugs.patient_other_drug })
  }

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    const otherDrugs = model['patient_other_drug'] == 'Yes'? (
      <>
        <Text>10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the
          relationship to the SAE:</Text>
        <SAEConcomitantTableComponent model={ model } validate={ this.state.validate } name="adr_other_drugs"/>
      </>
    ) :
    null;

    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] } keyboardShouldPersistTaps={'handled'}>
        <Text>8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
          their relationship to the SAE:</Text>
        <SAEDrugsTableComponent model={ model } validate={ this.state.validate } name="adr_list_of_drugs"/>
        <SelectOneField label="9. Was the patient taking any other drug at the time of onset of the AE?" model={ model } validate={ this.state.validate } name="patient_other_drug" options={ BOOLEAN_OPTIONS } onChange={ this.onOtherDrugsChange } />
        {otherDrugs}
        <Text>11. Has the Adverse Event been
          reported to:</Text>
        <SelectOneField label="(a) MCAZ" model={ model } validate={ this.state.validate } name="report_to_mcaz" options={ BOOLEAN_OPTIONS } onChange={this.onOptionChange} />
        {this.state.report_to_mcaz === 'Yes' && (
          <DateTimeInput label="Date" model={ model } validate={ this.state.validate } name="report_to_mcaz_date" maxDate={ new Date() }/>
        )}
        <SelectOneField label="(b) MRCZ" model={ model } validate={ this.state.validate } name="report_to_mrcz" options={ BOOLEAN_OPTIONS } onChange={this.onOptionChange}/>
        {this.state.report_to_mrcz === 'Yes' && (
          <DateTimeInput label="Date" model={ model } validate={ this.state.validate } name="report_to_mrcz_date" maxDate={ new Date() }/>
        )}
        <SelectOneField label="(c) Sponsor" model={ model } validate={ this.state.validate } name="report_to_sponsor" options={ BOOLEAN_OPTIONS } onChange={this.onOptionChange}/>
        {this.state.report_to_sponsor === 'Yes' && (
          <DateTimeInput label="Date" model={ model } validate={ this.state.validate } name="report_to_sponsor_date" maxDate={ new Date() }/>
        )}
        <SelectOneField label="(d) IRB" model={ model } validate={ this.state.validate } name="report_to_irb" options={ BOOLEAN_OPTIONS } onChange={this.onOptionChange}/>
        {this.state.report_to_irb === 'Yes' && (
          <DateTimeInput label="Date" model={ model } validate={ this.state.validate } name="report_to_irb_date" maxDate={ new Date() }/>
        )}

        <Text>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
          results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
          results of abnormal investigations and a hospital discharge letter may be attached:</Text>
        <TextInputField label="Summary of relevant past medical history of participant" multiline = {true}
          numberOfLines = {4} model={ model } validate={ this.state.validate }  name="medical_history" tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="(a) Diagnosis" multiline = {true}
          numberOfLines = {4} model={ model } validate={ this.state.validate } name="diagnosis" tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="(b) Immediate Cause" multiline = {true}
          numberOfLines = {4} model={ model } validate={ this.state.validate } name="immediate_cause" tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="(c) Symptoms" multiline = {true}
          numberOfLines = {4} model={ model } validate={ this.state.validate }  name="symptoms" tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="(d) Investigations-Laboratory and any other significant
          investigations conducted:" multiline = {true} model={ model } validate={ this.state.validate } name="investigations"
          numberOfLines = {4} tintColor="rgba(0, 0, 0, .60)"/>
        <LabsTableComponent model={ model } validate={ this.state.validate } name="adr_lab_tests"/>
        <TextInputField label="(e) Results:" multiline = {true} model={ model } validate={ this.state.validate } name="results"
          numberOfLines = {4} tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="(f) Management (Include management of study treatment, continued,
            temporarily held, reduced dose, permanent discontinuation, off Product):" multiline = {true}
          numberOfLines = {4} model={ model } validate={ this.state.validate } name="management" tintColor="rgba(0, 0, 0, .60)"/>
        <SelectOneField label="(g) Outcome:" multiline = {true} model={ model } validate={ this.state.validate } name="outcome"
          numberOfLines = {4} tintColor="rgba(0, 0, 0, .60)" options={ OUTCOME }/>
        <Text>NB If the outcome is death, please complete &amp; attach the death form.</Text>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(4) } color="#841584"  title="Save changes"/>
          <Button onPress={ () => cancel() } color="#841584"  title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onOptionChange(newValue) {
    const state = this.state;
    this.setState({...state, ...newValue});
    const { model } = this.props;
    
    const keys = Object.keys(newValue);
    if (keys.indexOf('report_to_mcaz') !== -1 && newValue['report_to_mcaz'] !== 'Yes') {
      model['report_to_mcaz_date'] = '';
    } else if (keys.indexOf('report_to_mrcz') !== -1 && newValue['report_to_mrcz'] !== 'Yes') {
      model['report_to_mrcz_date'] = '';
    } else if (keys.indexOf('report_to_sponsor') !== -1 && newValue['report_to_sponsor'] !== 'Yes') {
      model['report_to_sponsor_date'] = '';
    } else if (keys.indexOf('report_to_irb') !== -1 && newValue['report_to_irb'] !== 'Yes') {
      model['report_to_irb_date'] = '';
    }
  }
}
