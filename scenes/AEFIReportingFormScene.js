import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientReporterDetailsScene from './aefi-report/PatientReporterDetailsScene'
import AdverseEventsScene from './aefi-report/AdverseEventsScene'
import ReportDetailsScene from './aefi-report/ReportDetailsScene'
import VaccinationScene from './aefi-report/VaccinationScene'

export default class AEFIReportingFormScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Patient/Reporter details' },
      { key: '2', title: 'Vaccination' },
      { key: '3', title: 'Adverse events' },
      { key: '4', title: 'Report details' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _renderScene = SceneMap({
    '1': PatientReporterDetailsScene,
    '2': VaccinationScene,
    '3' : AdverseEventsScene,
    '4' : ReportDetailsScene,
  });

  render() {
    return (
      <TabViewAnimated
        style={[AppStyles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
