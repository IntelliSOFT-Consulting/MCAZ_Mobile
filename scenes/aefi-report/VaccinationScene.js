import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineTableComponent from '../components/VaccineTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'

export default class VaccinationScene extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      model: this.props.model
    }
  }

  onChange = (model) => {
    this.setState((prevState) => ({
      model: {...prevState.model, ...model}
    }), () => {
      this.props.handleModelChange(this.state.model)
    })
  }

  render() {
    const { saveAndContinue, cancel } = this.props;
    const { model } = this.state;
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        <TextInputField label="Name of vaccination centre:" name="name_of_vaccination_center" model={ model } onChange={this.onChange}/>
        <Text style={ AppStyles.boldText }>Vaccine/Dilutent</Text>
        <VaccineTableComponent model={ model } name="aefi_list_of_vaccines" label="Vaccine" onChange={this.onChange}/>

        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
