import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'
import DateTimeInput from './DateTimeInput'
import TableComponent from './TableComponent'

import AppStyles from '../../styles/AppStyles'

import { DOSE, RELATIONSHIP_SAE, ROUTE, FREQUENCY } from '../../utils/FieldOptions'

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
    var row = [
      <TextInput key={Math.floor(Math.random() * 10000) } name="drug_name" model={ model[name][index] }/>,
      <TextInput key={Math.floor(Math.random() * 10000)} name="dose" model={ model[name][index] }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="dose_id" model={ model[name][index] } options={ DOSE }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="route_id" model={ model[name][index] } options={ ROUTE }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="frequency_id" model={ model[name][index] } options={ FREQUENCY }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] }/>,
      <SelectOneField options={ ["Yes", "No"] } key={Math.floor(Math.random() * 10000)}/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="relationship_to_sae" options={ RELATIONSHIP_SAE }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  render() {
    const { label } = this.props
    const tableHead = ['Drug/Device/Vaccine', 'Dose', "", 'Route', 'Frequency', 'Date commenced', "Taking drug at onset of SAE", 'Relationsip of SAE to drug', ""];
    const widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 30]
    const rows = this.initializeRows()
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={tableHead} style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" color="#841584" />
      </View>
    )
  }
}
