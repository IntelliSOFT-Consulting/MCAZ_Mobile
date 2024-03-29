import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import DateTimeInput from '../components/DateTimeInput'
import SelectMultipleField from '../components/SelectMultipleField'

import { DESIGNATION, SAE_REPORT_TYPE, GENDER } from '../../utils/FieldOptions'

export default class SectionAScene extends PureComponent {
  state = {}
  constructor(props, context) {
    super(props,context)
  }

  render() {
    const { model, saveAndContinue, cancel, validate, followUp } = this.props
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null
    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.sadrBackground ] } keyboardShouldPersistTaps={'handled'}>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>
        { followUpField }
        <TextInputField label="MRCZ Protocol #" name="mrcz_protocol_number" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)" />
        <TextInputField label="MCAZ Protocol #"  name="mcaz_protocol_number"model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Institution"  name="name_of_institution" model={ model } validate={ this.state.validate } required={ true } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Principal Investigator:"  name="principal_investigator" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Phone:" keyboardType = 'phone-pad' name="reporter_phone" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Email:" keyboardType = 'email-address' name="reporter_email" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Report prepared by:" name="reporter_name" model={ model } validate={ this.state.validate } required={ true } tintColor="rgba(0, 0, 0, .60)"/>
        <SelectOneField label="Designation in the study:" name="designation_id" model={ model } validate={ this.state.validate } options={ DESIGNATION } required={true}/>

        <TextInputField label="Study Title:" name="study_title" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Study Sponsor:" name="study_sponsor" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <DateTimeInput label="Date of Adverse Event:" name="date_of_adverse_event" model={ model } validate={ this.state.validate } maxDate={ new Date() } />
        <DateTimeInput label="Date of Site Awareness:" name="date_of_site_awareness" model={ model } validate={ this.state.validate } maxDate={ new Date() } />
        <TextInputField label="Hosp. Num.:" name="institution_code" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Participant ID:" name="participant_number" model={ model } validate={ this.state.validate } tintColor="rgba(0, 0, 0, .60)"/>
        <DateTimeInput label="Date of Birth:" name="date_of_birth" model={ model } validate={ this.state.validate }  maxDate={ new Date() }/>
        <SelectOneField label="Gender " name="gender" model={ model } validate={ this.state.validate } options={ GENDER }/>
        <SelectOneField label="Type of Report" name="report_type" model={ model } validate={ this.state.validate } options={ SAE_REPORT_TYPE }/>
        <TextInputField label="Study week" name="study_week" model={ model } validate={ this.state.validate } keyboardType="numeric" tintColor="rgba(0, 0, 0, .60)"/>
        <TextInputField label="Visit number:-" name="visit_number" model={ model } validate={ this.state.validate } keyboardType="numeric" tintColor="rgba(0, 0, 0, .60)"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes" color="#841584" style={ AppStyles.saeButton }/>
          <Button onPress={ () => cancel() } color="#841584"  title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
