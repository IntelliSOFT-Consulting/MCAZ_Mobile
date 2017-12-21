import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AppStyles from '../../styles/AppStyles'
import TableComponent from './TableComponent'

import DateTimeInput from './DateTimeInput'
import TextInputField from './TextInputField'

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

export default class VaccineTableComponent extends TableComponent {

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
      <TextInputField key={Math.floor(Math.random() * 10000) } name="vaccine_name" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="vaccination_date" model={ model[name][index] } showTime={ true } maxDate={ new Date() }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="vaccination_time" model={ model[name][index] } mode={ "time" } />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="dosage" model={ model[name][index] } />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="expiry_date" model={ model[name][index] } />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="diluent_batch_number" model={ model[name][index] } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="diluent_expiry_date" model={ model[name][index] } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="diluent_date" model={ model[name][index] } maxDate={ new Date() } showTime={ true }/>,
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="vaccine_name" type="" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="vaccination_date" type="date" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="vaccination_time" type="" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="dosage" model={ model[name][index] } type="text"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="batch_number" type="text" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="expiry_date" type="date" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="diluent_batch_number"  model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="diluent_expiry_date" type="date" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="diluent_date" type="date" model={ model[name][index] } showTime={ true }/>
    ]
    return row
  }

  render() {
    const { label, model, readonly } = this.props
    var tableHeader = ['Vaccine', 'Diluent']
    var headerWidth = [720, 360]
    var tableHead = ['Name', 'Date and time of vaccination', 'Dose (1st, 2nd, etc)', 'Batch/Lot number', "Expiry date", 'Batch/ Lot Number', 'Expiry date', 'Time of reconstitution'];
    var widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 120]
    var labelsArr = [120, 240, 120, 120, 120, 120, 120, 120]

    const rows = this.initializeRows(readonly)
    var addRowBtn = null
    if(!readonly) {
      widthArr.push(30)
      labelsArr.push(30)
      headerWidth[1]+= 30
      tableHead.push("")
      addRowBtn = <Button onPress={this.addRow} title="Add row" color="#841584" />
    }

    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ tableHeader } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ headerWidth }/>
            <Row data={ tableHead } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ labelsArr }/>
            <Rows data={ rows }  widthArr={ widthArr }/>
          </Table>
        </ScrollView>
        { addRowBtn }
      </View>
    )
  }
}
