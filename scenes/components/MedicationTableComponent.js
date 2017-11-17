import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimeInput from './DateTimeInput'
import AppStyles from '../../styles/AppStyles'
import TextInputField from './TextInputField'
import SelectOneField from './SelectOneField'
import CheckBoxInput from './CheckBoxInput'

import { FREQUENCY, ROUTE, DOSE } from '../../utils/FieldOptions'


export default class MedicationTableComponent extends Component {
  name = "sadr_list_of_drugs"
  constructor(props) {
    super(props)

    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getHeader = this.getHeader.bind(this)

    const { model, name } = this.props
    var rows = []
    if(model[name]) {
      data = model[name]
      for(let i = 0; i < data.length; i++) {
        rows[i] = this.getRow(i)
      }
    }
    this.state = { rows : rows }
  }

  /**
    Adds a new row to the table.
  */
  addRow() {
    var rows = this.state.rows
    const index = rows.length

    rows.push(this.getRow(index))
    this.setState({ rows : rows })
  }

  getHeader() {
    const headers = ['Generic/Brand Name ', 'Batch No.', 'Dose', '','Route', 'Frequency', 'Date Started', 'Date Stopped', "Indication", 'Tick Suspected medicine', ""];
    var headerEls = []
    mandatory = [0, 2, 3, 4, 7] // mandatory indices
    for(let i = 0; i < headers.length; i++) {
      if(mandatory.indexOf(i) != -1) {
        const header = (
          <Text>{ headers[i] } <Text style={ AppStyles.required }>*</Text></Text>
        )
        headerEls[i] = header
      } else {
        headerEls[i] = headers[i]
      }
    }
    return headerEls
  }

  /**
    Returns a new row for the given index.
    It checks the for data within the given index and sets it.
  */
  getRow(index) {
    const rowData = {}
    const { model, name } = this.props
    if(!model[name]) {
      model[name] = []
    }
    if(!model[name][index]) {
      model[name][index] = rowData
    }
    var row = [
      <TextInputField key={Math.floor(Math.random() * 10000) } name="brand_name" model={ model[name][index] } />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="dose_id" model={ model[name][index] }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="dose_id" model={ model[name][index] } options={ DOSE }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="route_id" model={ model[name][index] } options={ ROUTE }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="frequency_id" model={ model[name][index] } options={ FREQUENCY}/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="start_date" label="" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="stop_date" label="" model={ model[name][index] }/>,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="indication" model={ model[name][index] }/>,
      <CheckBoxInput key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  /**
    Removes a row from the table.
    This function then recreates all the rows.
    This ensures that the delete button gets the new correct index.
  */
  removeRow(index) {
    var rows = this.state.rows
    rows.splice(index, 1)
    const { model, name } = this.props
    model[name].splice(index, 1)
    const length = rows.length
    var newRows = []
    var i = 0
    while(i < length) {
      newRows.push(this.getRow(i))
      i++
    }
    this.setState({ rows : newRows })
  }

  render() {
    const { label } = this.props
    const tableHead = ['Generic/Brand Name', 'Batch No.', 'Dose*', 'Frequency', 'Date Started*', 'Date Stopped', "Indication", 'Tick Suspected medicine*', ""];
    const widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 120, 30]
    const headerEls = this.getHeader()
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ headerEls } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ widthArr }/>
            <Rows data={ this.state.rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" color="#841584" />
      </View>
    )
  }
}
