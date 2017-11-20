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

        <TextInputField label="MRCZ Protocol #:" name="mrcz_protocol_number" model={ model }/>
        <TextInputField label="MCAZ Protocol #"  name="mraz_protocol_number"model={ model }/>
        <TextInputField label="Institution"  name="name_of_institution" model={ model }/>
        <TextInputField label="Principle Investigator:"  name="principal_investigator" model={ model }/>
        <TextInputField label="Phone:" keyboardType = 'phone-pad' name="reporter_phone" model={ model }/>
        <TextInputField label="Email:" keyboardType = 'email-address' name="reporter_email" model={ model }/>
        <TextInputField label="Report prepared by:" name="reporter_name" model={ model }/>
        <SelectOneField label="Designation in the study:" name="designation_id" model={ model } options={ DESIGNATION }/>
        <DateTimeInput label="Date Form completed" name="" model={ model }/>
        <TextInputField label="Study Title:" name="study_title" model={ model }/>
        <TextInputField label="Study Sponsor:" name="study_sponsor" model={ model }/>
        <DateTimeInput label="Date of Adverse Event:" name="date_of_adverse_event" model={ model }/>
        <TextInputField label="Participant ID:" name="participant_number" model={ model }/>
        <SelectOneField label="Hosp. Num.:" name="institution_code" model={ model }/>
        <DateTimeInput label="Date of Site Awareness:" name="date_of_site_awareness" model={ model }/>
        <DateTimeInput label="Date of Birth:" name="date_of_birth" model={ model }/>
        <SelectOneField label="Gender :" name="gender" model={ model } options={['Male', 'Female', 'Unknown']}/>
        <SelectOneField label="Type of Report:" name="report_type" model={ model } options={ REPORT_TYPE_SAE }/>
        <TextInputField label="Study week:-" name="study_week" model={ model }/>
        <TextInputField label="Visit number:-" name="visit_number" model={ model }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
