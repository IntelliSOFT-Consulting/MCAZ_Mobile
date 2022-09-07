import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AppStyles from '../../styles/AppStyles'
import TableComponent from './TableComponent'
import ReadOnlyDataRenderer from "./ReadOnlyDataRenderer"

import TextInputField from './TextInputField'

export default class VaccineDosesTableComponent extends TableComponent {

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
      <TextInputField key={Math.floor(Math.random() * 10000) } name="vaccine_name" model={ model[name][index] } hideLabel={true} />,
      <TextInputField key={Math.floor(Math.random() * 10000) } name="vaccination_doses" model={ model[name][index] } keyboardType="numeric" hideLabel={true} />,
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="vaccination_doses" type="date" model={ model[name][index] }/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var tableHead = ['Vaccine', 'Number of Doses'];
    var widthArr = [120, 120]

    const rows = this.initializeRows(readonly)
    var addRowBtn = null
    if(!readonly) {
      widthArr.push(30)
      tableHead.push("")
      addRowBtn = <Button onPress={this.addRow} title="Add row" color="#841584" />
    }

    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={tableHead} style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        { addRowBtn }
      </View>
    )
  }
}
