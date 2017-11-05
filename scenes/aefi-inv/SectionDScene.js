import React, { PureComponent } from 'react';

import { View, ScrollView, Text } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import VaccineDosesTableTableComponent from '../components/VaccineDosesTableComponent'

export default class SectionDScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>
          Number vaccinated for each antigen at session site. Attach record if available.
        </Text>
        <VaccineDosesTableTableComponent />
        <TextInputField label="Vaccine name" />
        <TextInputField label="Number of doses" />
        <SelectOneField label="(a) When was the patient vaccinated?" />
        <SelectOneField label="In case of multidose vials, was the vaccine given" />
        <SelectOneField label="(b) Was there an error in prescribing or non-adherence to recommendations for use of this vaccine?" />
        <SelectOneField label="(c) Based on your investigation, do you feel that the vaccine (ingredients) administered could have been unsterile?" />
        <SelectOneField label="(d) Based on your investigation, do you feel that the vaccine&#39;s physical condition (e.g. colour, turbidity, foreign substances etc.) was abnormal at the time of administration?"/>
        <SelectOneField label="(e) Based on your investigation, do you feel that there was an error in vaccine
          reconstitution/preparation by the vaccinator (e.g. wrong product, wrong diluent, improper mixing,
          improper syringe filling etc.)?"/>
        <SelectOneField label="(f) Based on your investigation, do you feel that there was an error in vaccine handling (e.g. cold
          chain failure during transport, storage and/or immunization session etc.)?"/>
        <SelectOneField label="(g) Based on your investigation, do you feel that the vaccine was administered incorrectly (e.g. wrong
          dose, site or route of administration, wrong needle size, not following good injection practice etc.)?"/>
        <TextInputField label="(h) Number vaccinated from the concerned vaccine vial/ampoule" />
        <TextInputField label="(i) Number vaccinated with the concerned vaccine in the same session" />
        <TextInputField label="(j) Number vaccinated with the concerned vaccine having the same batch number in other locations."
          />
        <TextInputField label="Specify locations:" />
        <SelectOneField label="(k) Is this case a part of a cluster?" />
        <TextInputField label=" If yes, how many other cases have been detected in the cluster?" />
        <SelectOneField label="a. Did all the cases in the cluster receive vaccine from the same vial?" />
        <TextInputField label="b. If no, number of vials used in the cluster (enter details separately)" />
      </ScrollView>
    )
  }
}
