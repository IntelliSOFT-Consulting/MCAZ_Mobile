import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'
import DateTimeInput from './DateTimeInput'
import TableComponent from './TableComponent'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import TextInputField from './TextInputField'

import AppStyles from '../../styles/AppStyles'

import { DOSE, RELATIONSHIP_SAE, ROUTE, SAE_FREQUENCY, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class SAEDrugsTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props
    this.getRow = this.getRow.bind(this)
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    const { model, name } = this.props
    const inUtero = model['in_utero'];
    const minStartDate = inUtero != '1' && model['date_of_birth'] != null ? new Date(model['date_of_birth']) : undefined
    var row = [
      <TextInputField key={Math.floor(Math.random() * 100000000) } name="drug_name" model={ model[name][index] }/>,
      <TextInputField key={Math.floor(Math.random() * 100000000)} name="dosage" model={ model[name][index] }/>,
      <SelectOneField key={Math.floor(Math.random() * 100000000)} name="dose_id" model={ model[name][index] } options={ DOSE }/>,
      <SelectOneField key={Math.floor(Math.random() * 100000000)} name="route_id" model={ model[name][index] } options={ ROUTE }/>,
      <SelectOneField key={Math.floor(Math.random() * 100000000)} name="frequency_id" model={ model[name][index] } options={ SAE_FREQUENCY }/>,
      <DateTimeInput key={Math.floor(Math.random() * 100000000)} name="start_date" model={ model[name][index] } minDate={minStartDate}/>,
      <SelectOneField options={ BOOLEAN_OPTIONS } key={Math.floor(Math.random() * 10000000)} name="taking_drug" model={ model[name][index] }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000000)} name="relationship_to_sae" options={ RELATIONSHIP_SAE } model={ model[name][index] }/>,
      <Button key={ Math.floor(Math.random() * 10000000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  /**
    Returns a new row for the given index.
    It checks the for data within the given index and sets it.
  */
  getReadOnlyRow(index) {
    const rowData = {}
    const { model, name } = this.props

    var row = [
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="drug_name" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="dosage" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="dose_id" model={ model[name][index] } options={ DOSE } type="option"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="route_id" model={ model[name][index] } options={ ROUTE } type="option"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="frequency_id" model={ model[name][index] } options={ SAE_FREQUENCY } type="option"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] } type="date" />,
      <ReadOnlyDataRenderer options={ BOOLEAN_OPTIONS } key={Math.floor(Math.random() * 10000)} name="taking_drug" model={ model[name][index] } type="option"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="relationship_to_sae" options={ RELATIONSHIP_SAE } model={ model[name][index] } type="option"/>
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var tableHead = ['Drug/Device/Vaccine', 'Dose', "", 'Route', 'Frequency', 'Date commenced', "Taking drug at onset of SAE", 'Relationsip of SAE to drug'];
    var widthArr = [120, 120, 120, 120, 120, 120, 120, 120]
    const rows = this.initializeRows(readonly)
    var addBtn = null
    if(!readonly) {
      widthArr.push(30)
      tableHead.push("")
      addBtn = ( <Button onPress={this.addRow} title="Add row" color="#841584" /> )
    }

    return (
      <View style={ AppStyles.tableView }>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ tableHead } style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        { addBtn }
        <Text style={{ fontStyle : 'italic' }}>Scroll to the left to see whole table</Text>
      </View>
    )
  }
}
