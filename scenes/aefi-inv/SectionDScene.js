import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineDosesTableTableComponent from '../components/VaccineDosesTableComponent'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, WHEN_VACCINATED, BOOLEAN_UNABLE_OPTIONS } from '../../utils/FieldOptions'

export default class SectionDScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, validate } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>
          Number vaccinated for each antigen at session site. Attach record if available.
        </Text>
        <VaccineDosesTableTableComponent model={ model } name="saefi_list_of_vaccines"/>
        <SelectOneField label="(a) When was the patient vaccinated?" model={ model } name="when_vaccinated" options={ WHEN_VACCINATED }/>
        <SelectOneField label="In case of multidose vials, was the vaccine given" model={ model } name="when_vaccinated" options={ WHEN_VACCINATED }/>
        <TextInputField label="Specify" model={ model } name="when_vaccinated_specify"/>
        <SelectOneField model={ model } name="prescribing_error" options={ BOOLEAN_UNABLE_OPTIONS } label="(b) Was there an error in prescribing or non-adherence to recommendations for use of this vaccine?" />
        <TextInputField label="Remarks" model={ model } name="prescribing_error_specify"/>
        <SelectOneField model={ model } name="vaccine_unsterile" options={ BOOLEAN_UNABLE_OPTIONS } label="(c) Based on your investigation, do you feel that the vaccine (ingredients) administered could have been unsterile?" />
        <TextInputField label="Remarks" model={ model } name="vaccine_unsterile_specify"/>
        <SelectOneField model={ model } name="vaccine_condition" options={ BOOLEAN_UNABLE_OPTIONS } label="(d) Based on your investigation, do you feel that the vaccine&#39;s physical condition (e.g. colour, turbidity, foreign substances etc.) was abnormal at the time of administration?"/>
        <TextInputField label="Remarks" model={ model } name="vaccine_condition_specify"/>
        <SelectOneField model={ model } name="vaccine_reconstitution" options={ BOOLEAN_UNABLE_OPTIONS } label="(e) Based on your investigation, do you feel that there was an error in vaccine
          reconstitution/preparation by the vaccinator (e.g. wrong product, wrong diluent, improper mixing,
          improper syringe filling etc.)?"/>
        <TextInputField label="Remarks" model={ model } name="vaccine_reconstitution_specify"/>
        <SelectOneField model={ model } name="vaccine_handling" options={ BOOLEAN_UNABLE_OPTIONS } label="(f) Based on your investigation, do you feel that there was an error in vaccine handling (e.g. cold
          chain failure during transport, storage and/or immunization session etc.)?"/>
        <TextInputField label="Remarks" model={ model } name="vaccine_handling_specify"/>
        <SelectOneField model={ model } name="vaccine_administered" options={ BOOLEAN_UNABLE_OPTIONS } label="(g) Based on your investigation, do you feel that the vaccine was administered incorrectly (e.g. wrong
          dose, site or route of administration, wrong needle size, not following good injection practice etc.)?"/>
        <TextInputField label="Remarks" model={ model } name="vaccine_administered_specify"/>
        <TextInputField model={ model } name="vaccinated_vial" label="(h) Number vaccinated from the concerned vaccine vial/ampoule" />
        <TextInputField model={ model } name="vaccinated_session" label="(i) Number vaccinated with the concerned vaccine in the same session" />
        <TextInputField model={ model } name="vaccinated_locations" label="(j) Number vaccinated with the concerned vaccine having the same batch number in other locations."
          />
        <TextInputField model={ model } name="vaccinated_locations_specify" label="Specify locations:" />
        <SelectOneField model={ model } name="vaccinated_cluster" options={ BOOLEAN_UNKNOWN_OPTIONS } label="(k) Is this case a part of a cluster?" />
        <TextInputField model={ model } name="vaccinated_cluster_number" label=" If yes, how many other cases have been detected in the cluster?" />
        <SelectOneField model={ model } name="vaccinated_cluster_vial" options={ BOOLEAN_UNKNOWN_OPTIONS } label="a. Did all the cases in the cluster receive vaccine from the same vial?" />
        <TextInputField model={ model } name="vaccinated_cluster_vial_number" label="b. If no, number of vials used in the cluster (enter details separately)" />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
