import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AppStyles from '../../styles/AppStyles'
import TableComponent from './TableComponent'

export default class VaccineDilutentTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props

    this.getRow = this.getRow.bind(this)
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    var row = [
      <TextInput key={Math.floor(Math.random() * 10000) }/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <CheckBox key={Math.floor(Math.random() * 10000)}/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  render() {
    const { label, model } = this.props
    const tableHead = ['Name', 'Date of vaccination', 'Time of vaccination', 'Dose (1st, 2nd, etc)', 'Batch/Lot number', "Expiry date", 'Batch/Lot number', 'Expiry date', "Time of reconstitution",""];
    const widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 120, 30]
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={tableHead} style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ this.state.rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" color="#841584" />
      </View>
    )
  }
}
