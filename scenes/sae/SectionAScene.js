import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import DateTimeInput from '../components/DateTimeInput'
import SelectMultipleField from '../components/SelectMultipleField'

import { DESIGNATION, REPORT_TYPE_SAE } from '../../utils/FieldOptions'

export default class SectionAScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <TextInputField label="MRCZ Protocol #:" name="mrcz_protocol_number" model={ model } validate={ this.state.validate } required={ true } />
        <TextInputField label="MCAZ Protocol #"  name="mraz_protocol_number"model={ model } validate={ this.state.validate } required={ true } />
        <TextInputField label="Institution"  name="name_of_institution" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Principle Investigator:"  name="principal_investigator" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Phone:" keyboardType = 'phone-pad' name="reporter_phone" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Email:" keyboardType = 'email-address' name="reporter_email" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Report prepared by:" name="reporter_name" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="Designation in the study:" name="designation_id" model={ model } validate={ this.state.validate } required={ true } options={ DESIGNATION }/>
        <DateTimeInput label="Date Form completed" name="" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Study Title:" name="study_title" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Study Sponsor:" name="study_sponsor" model={ model } validate={ this.state.validate } required={ true }/>
        <DateTimeInput label="Date of Adverse Event:" name="date_of_adverse_event" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Participant ID:" name="participant_number" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="Hosp. Num.:" name="institution_code" model={ model } validate={ this.state.validate } required={ true }/>
        <DateTimeInput label="Date of Site Awareness:" name="date_of_site_awareness" model={ model } validate={ this.state.validate } required={ true }/>
        <DateTimeInput label="Date of Birth:" name="date_of_birth" model={ model } validate={ this.state.validate } required={ true }/>
        <SelectOneField label="Gender :" name="gender" model={ model } validate={ this.state.validate } required={ true } options={['Male', 'Female', 'Unknown']}/>
        <SelectOneField label="Type of Report:" name="report_type" model={ model } validate={ this.state.validate } required={ true } options={ REPORT_TYPE_SAE }/>
        <TextInputField label="Study week:-" name="study_week" model={ model } validate={ this.state.validate } required={ true }/>
        <TextInputField label="Visit number:-" name="visit_number" model={ model } validate={ this.state.validate } required={ true }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
