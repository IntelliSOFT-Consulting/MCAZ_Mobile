import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import DateSelectInput from '../components/DateSelectInput'
import AutoCompleteInput from '../components/AutoCompleteInput'

import { AGE_GROUP, GENDER } from '../../utils/FieldOptions'
import { getDateTimeFromString } from '../../utils/utils'

import moment from 'moment'

export default class PatientDetails extends PureComponent {

  constructor(props, context) {
    super(props, context)
    const { model } = this.props
    this.state = { model }
    this.onSelectOfInstitution = this.onSelectOfInstitution.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }


  onSelectOfInstitution = (value) => {
    const { model } = this.props
    if(typeof value == "object") {
      this.setState({ institution_code : value.code })
      model['institution_code'] = value.code
    } else {
      this.setState({ institution_code : "" })
      model['institution_code'] = ""
    }
  }

  render() {
    const { saveAndContinue, cancel, validate, followUp } = this.props;
    const { model } = this.state;
    const followUpField = followUp == true? (<TextInputField name="parent_id" model={ model } label="Parent MCAZ ID"/>) : null

    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.adrBackground] } keyboardShouldPersistTaps={'handled'}>
        <Text style={ AppStyles.boldText }>Identities of Reporter, Patient and Institute will remain confidential</Text>

        <Text style={ AppStyles.boldText }>Patient Details</Text>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Clinical/Hospital Name</Text>
        <AutoCompleteInput name="name_of_institution" model={ model } label="Clinical/Hospital Name :" returnKeyType="next" onChange={ this.onSelectOfInstitution }/>
        <TextInputField
          name="institution_code"
          model={ model }
          label="Clinical/Hospital Number :"
          returnKeyType="next"
          value={ this.state.institution_code }
          handleModelChange={this.props.handleModelChange}
        />
        <TextInputField name="patient_name" model={ model } label="Patient Initials:" validate={ this.props.validate } returnKeyType="next" handleModelChange={this.props.handleModelChange}/>
        <TextInputField name="ip_no" model={ model } label="VCT/OI/TB Number" handleModelChange={this.props.handleModelChange}/>
        <DateTimeInput name="date_of_birth" model={ model } label="Date of birth " validate={ this.props.validate } maxDate={ new Date() } onChange={ this.onDateChange } value={ this.state.date_of_birth }/>
        <TextInputField
          name="age"
          model={ model }
          keyboardType="numeric" 
          label="OR Age"
          value={ this.state.age }
          handleModelChange={(m) => this.onAgeChange(m.age)}
        />

        <TextInputField name="weight" model={ model } label="Weight(Kg)" keyboardType='numeric' validate={ this.props.validate } handleModelChange={this.props.handleModelChange}/>
        <TextInputField name="height" model={ model } label="Height(cm)" keyboardType='numeric' handleModelChange={this.props.handleModelChange}/>
        <SelectOneField name="gender" model={ model } label="Gender" options={ GENDER } validate={ this.props.validate } handleModelChange={this.props.handleModelChange}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(2) } title="Save changes"/>
          <Button onPress={ () => cancel() } title='Close'/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onDateChange = (value) => {
    const values = value['date_of_birth'].split("-")
    if(value != null) {
      const time = moment().year(values[2]).month(values[1]).date(values[0])
      const now = moment()
      const oldModel = this.props.model;
      const model = {};
      if(now.year() == time.year() && time.month() > now.month() ) {
        model['date_of_birth'] = "--" + time.year()
        this.setState({ date_of_birth : model['date_of_birth'] })
        return
      } else if(now.year() == time.year() && time.month() == now.month() && time.date() > now.date()) {
        model['date_of_birth'] = "-" + time.month() + "-" + time.year()
        this.setState({ date_of_birth : model['date_of_birth'] })
        return
      }
      const age = now.diff(time, 'years', true);
      const days = now.diff(time, 'days', true);
      var age_group = this.calculateAgeGroup(age, days)

      model['age_group'] = age_group
      model['age'] = ""
      model['date_of_birth'] = value.date_of_birth;

      const newModel = {...this.state.model, ...model};
      //const dob = value.getDate() + "-" + (value.getMonth() + 1) + "-" + value.getFullYear();
      
      this.setState({ model: newModel}, () => {
        this.props.handleModelChange({...newModel });
      })
    }

  }

  calculateAgeGroup = (age, days) => {
    var age_group = ""
    if(days <= 28) {
      age_group = "neonate"
    } else if(age >= 70) {
      age_group = "elderly"
    } else if(age >= 17) {
      age_group = "adult"
    } else if(age >= 12) {
      age_group = "adolescent"
    } else if(age >= 5) {
      age_group = "child"
    } else {
      age_group = "infant"
    }
    return age_group
  }

  onAgeChange = (age) => {
    var age_group = this.calculateAgeGroup(age)
    const model  = {}
    model['age_group'] = age_group
    model['date_of_birth'] = ""
    model['age'] = age;
    const newModel = {...this.state.model, ...model};
    this.setState({ model : newModel });
    this.props.handleModelChange({ date_of_birth : '', age_group, age });
  }

  /* <TextInputField label="MCAZ Reference Number (MCAZ use only)"/>
  shouldComponentUpdate(nextProps, nextState) {
    const { validate } = this.props
    const newValidate = nextProps.validate
    if(validate != newValidate) {
      return true
    }
    return false
  }*/
}/*<SelectOneField name="age_group" model={ model } label="Age group" options={ AGE_GROUP } value={ this.state.age_group }/>*/

//https://snack.expo.io/rJxdeFIIb
