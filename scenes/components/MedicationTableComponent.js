import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimeInput from './DateTimeInput'
import AppStyles from '../../styles/AppStyles'
import TextInputField from './TextInputField'
import SelectOneField from './SelectOneField'
import CheckBoxInput from './CheckBoxInput'
import TableComponent from './TableComponent'

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE } from '../../utils/FieldOptions'


export default class MedicationTableComponent extends TableComponent {
  name = "sadr_list_of_drugs"
  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
    this.getHeader = this.getHeader.bind(this)
    this.getReadOnlyRow = this.getReadOnlyRow.bind(this)
    const { model, name } = this.props
  }

  /**
    Adds a new row to the table.
  */
  addRow() {
    var rows = this.state.rows
    const index = rows.length
    rows.push({})
    this.setState({ rows : rows })
  }

  getHeader() {
    const { readonly } = this.props
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
    if(readonly) {
      return headerEls.splice(10)
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
  } // color="#841584"

  getReadOnlyRow(index) {
    const rowData = {}
    const { model, name } = this.props
    if(!model[name]) {
      model[name] = []
    }
    if(!model[name][index]) {
      model[name][index] = rowData
    }
    var row = [
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="brand_name" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="dose_id" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="dose_id" type="option" model={ model[name][index] } options={ DOSE }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="route_id" type="option" model={ model[name][index] } options={ ROUTE }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="frequency_id" type="option" model={ model[name][index] } options={ FREQUENCY}/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="start_date" label="" type="date" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="stop_date" label="" type="date" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="indication" model={ model[name][index] }/>,
      <CheckBoxInput key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] }/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props

    const widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 120, 30]
    const headerEls = this.getHeader()
    const rows = this.initializeRows(readonly)
    var addRowBtn = null
    if(readonly) {
      addRowBtn = (<Button onPress={this.addRow} title="Add row"  />)
    }
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ headerEls } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ widthArr }/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        { addRowBtn }
      </View>
    )
  }
}
