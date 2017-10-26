import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button } from 'react-native'
import TextInputField from './components/TextInputField'
import SelectOneField from './components/SelectOneField'
import AppStyles from '../styles/AppStyles'

export default class AEFIInvFormScene extends Component {
  static navigationOptions = {
    title: 'AEFI Investigation Form',
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
        <Text style={ AppStyles.boldText }>Section A : Basic details</Text>

        <SelectOneField label="Place of vaccination:"/>
        <SelectOneField label="Type of site"/>
        <SelectOneField label="Vaccination in"/>
        <TextInputField label="Name of Investigating Health Worker:"/>
        <TextInputField label="Designation / Position:" />
        <TextInputField label="Telephone # landline (with code):" keyboardType = 'phone-pad'/>
        <TextInputField label="Mobile:" keyboardType = 'phone-pad'/>
        <TextInputField label="Email:" keyboardType = 'email-address' />
        <TextInputField label="Date AEFI reported:"/>
        <TextInputField label="Date investigation started:"/>
        <TextInputField label="Date investigation completed:"/>
        <TextInputField label="Patient Name:"/>
        <SelectOneField label="Sex:"/>
        <TextInputField label="Date of hospitalization (DD/MM/YYYY):"/>
        <SelectOneField label="Status on the date of investigation:" />
        <TextInputField label="If died, date and time of death:"/>
        <TextInputField label="Autopsy done?"/>
        <TextInputField label="Date:" />
        <TextInputField label="Planned on Date:" />
        <Text style={ AppStyles.boldText }>Section B: Relevant patient information prior to immunization</Text>
        <SelectOneField label="Past history of similar event" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Adverse event after previous vaccination(s)" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="History of allergy to vaccine, drug or food" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Pre-existing illness (30 days) / congenital disorder" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="History of hospitalization in last 30 days, with cause" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Was patient on medication at time of vaccination? (If yes, name the drug, indication, doses &amp; treatment dates)" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" multiline = {true}
          numberOfLines = {4}/>
        <SelectOneField label="Did patient consult faith healers before/after vaccination? *specify" options={ ["Yes", "No"]}/>
        <TextInputField label="Remarks (If yes provide details)" />
        <SelectOneField label="Family history of any disease (relevant to AEFI) or allergy" options={ ["Yes", "No"]}/>
        <Text>For adult women</Text>
        <SelectOneField label="Currently pregnant?"/>
        <TextInputField label="(weeks)" />
        <Text>For infants</Text>
        <SelectOneField label="The birth was"/>
        <TextInputField label="Birth weight:"/>
        <SelectOneField label="Delivery procedure was:" />
        <TextInputField label="Specify:"/>
        <Text style={ AppStyles.boldText } >Section C Details of first examination** of serious AEFI case</Text>
        <SelectOneField label="Source of information" />
        <TextInputField label="Other"/>
        <TextInputField label="If from verbal autopsy, please mention source"/>
        <TextInputField label="Name of the person who first examined/treated the patient:"/>
        <TextInputField label="Other sources who provided information (specify):"/>
        <TextInputField label="Name of patient:" />
        <TextInputField label="AEFI Report ID:" />
        <TextInputField label="Signs and symptoms in chronological order from the time of vaccination:" />
        <TextInputField label="Name and contact information of person completing these clinical details:" />
        <TextInputField label="Designation:" />
        <TextInputField label="Date/time"/>
        <Text style={ AppStyles.boldText }>
          **Instructions – Attach copies of ALL available documents (including case sheet, discharge summary, case notes,
          laboratory reports and autopsy reports) and then complete additional information NOT AVAILABLE in
          existing documents, i.e.
        </Text>
        <Text>If patient has received medical care  attach copies of all available documents (including case sheet, discharge
          summary, laboratory reports and autopsy reports, if available) and write only the information that is not
          available in the attached documents below
        </Text>
        <Text>
          If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
          additional sheets if necessary)
        </Text>
        <Text>
          Provisional / Final diagnosis:
        </Text>
        <Text>
          Section D Details of vaccines provided at the site linked to AEFI on the corresponding day
        </Text>
        <Text>
          Number vaccinated for each antigen at session site. Attach record if available.
        </Text>
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

        <Text>Section E Immunization practices at the place(s) where concerned vaccine was used.</Text>
        <Text>(Complete this section by asking and/or observing practice)</Text>

        <Text>Syringes and needles used:</Text>
        <SelectOneField label="Are AD syringes used for immunization?" />
        <SelectOneField label="If no, specify the type of syringes used:" />
        <TextInputField label="Other" />
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Reconstitution: (complete only if applicable,  NA if not applicable)</Text>
        <Text>Reconstitution procedure ()</Text>
        <SelectOneField label="Same reconstitution syringe used for multiple vials of same vaccine?" />
        <SelectOneField label="Same reconstitution syringe used for reconstituting different vaccines?" />
        <SelectOneField label="Separate reconstitution syringe for each vaccine vial?" />
        <SelectOneField label="Separate reconstitution syringe for each vaccination?" />

        <SelectOneField label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" />
        <TextInputField label="Specific key findings/additional observations and comments:" multiline = {true} numberOfLines = {4}/>
        <Text>Section F Cold chain and transport</Text>
        <Text>(Complete this section by asking and/or observing practice)</Text>
        <Text>Last vaccine storage point:</Text>
        <SelectOneField label="Is the temperature of the vaccine storage refrigerator monitored?" options={ ["Yes", "No"] }/>
        <SelectOneField label="If “yes”, was there any deviation outside of 2-8 ° C after the vaccine was placed inside?" options={ ["Yes", "No"] }/>
        <TextInputField label="If “yes”, provide details of monitoring separately."/>
        <SelectOneField label="Was the correct procedure for storing vaccines, diluents and syringes followed?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any partially used reconstituted vaccines in the refrigerator?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" options={ ["Yes", "No"] }/>
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Vaccine transportation from the refrigerator to the vaccination centre:</Text>
        <SelectOneField label="Was cold chain properly maintained during transportation?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Was the vaccine carrier sent to the site on the same day as vaccination?" options={ ["Yes", "No"] }/>
        <SelectOneField label="Were conditioned coolant-packs used?" options={ ["Yes", "No"] }/>
        <TextInputField label="Specific key findings/additional observations and comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Section G Community investigation (Please visit locality and interview parents/others)</Text>
        <SelectOneField label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" options={ ["Yes", "No"] }/>
        <TextInputField label="If yes, describe:" multiline={true} numberOfLines={4}/>
        <TextInputField label="If yes, how many events/episodes?" multiline={true} numberOfLines={4}/>
        <Text>Of those affected, how many are </Text>
        <TextInputField label="Vaccinated:" />
        <TextInputField label="Not vaccinated:" />
        <TextInputField label="Unknown:" />
        <TextInputField label="Other comments:" multiline={true} numberOfLines={4}/>
        <Text style={ AppStyles.boldText }>Section H Other relevant findings\/observations\/comments</Text>
        <TextInputField label="Other comments:" multiline={true} numberOfLines={4}/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    );
  }
}
