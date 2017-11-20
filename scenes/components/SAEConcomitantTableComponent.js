import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'
import DateTimeInput from './DateTimeInput'

import TableComponent from './TableComponent'
import AppStyles from '../../styles/AppStyles'
import { RELATIONSHIP_SAE } from '../../utils/FieldOptions'

export default class SAEConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props
    //this.state = { }
    this.getRow = this.getRow.bind(this)
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    const { model, name } = this.props
    var row = [
      <TextInput key={Math.floor(Math.random() * 10000)} name="drug_name" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="stop_date" model={ model[name][index] }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] } options={ RELATIONSHIP_SAE }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  render() {
    const { label } = this.props
    const tableHead = ['Concomitant medication', 'Date started', 'Date stopped', 'Relationship of SAE to medication', ""];
    const widthArr = [120, 120, 120, 120, 30]
    const rows = this.initializeRows()
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ tableHead } style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={ widthArr }/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" color="#841584" />
      </View>
    )
  }
}