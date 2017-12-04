import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'
import DateTimeInput from './DateTimeInput'
import TableComponent from './TableComponent'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

import AppStyles from '../../styles/AppStyles'

import { DOSE, RELATIONSHIP_SAE, ROUTE, FREQUENCY, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class AEFIDilutentTableComponent extends TableComponent {

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
      <TextInput key={Math.floor(Math.random() * 10000) } name="diluent_name" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="diluent_date" model={ model[name][index] } maxDate={ new Date() }/>,
      <TextInput key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] } options={ DOSE } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="expiry_date" model={ model[name][index] } />,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="diluent_name" type="" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="diluent_date" type="date" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] } options={ DOSE } type="option"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="expiry_date" type="date" model={ model[name][index] } options={ ROUTE } type="option"/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var tableHead = ['Name', 'Date and time of reconstitution', "Batch/Lot number", 'Expiry date'];
    var widthArr = [120, 120, 120, 120]
    const rows = this.initializeRows(readonly)
    if(!readonly) {
      widthArr.push(30)
      tableHead.push("")
    }
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
