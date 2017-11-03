import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import PatientDetails from './adr/PatientDetails'
import Medication from './adr/Medication'
import ReporterDetailsScene from './adr/ReporterDetailsScene'
import AdverseReactionScene from './adr/AdverseReactionScene'

export default class ADRSceneTabbed extends PureComponent {
  static navigationOptions = {
    title: 'ADR Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Patient details' },
      { key: '2', title: 'Adverse reaction' },
      { key: '3', title: 'Medication' },
      { key: '4', title: 'Reported by' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} />;

  _renderScene = SceneMap({
    '1': PatientDetails,
    '2': AdverseReactionScene,
    '3' : Medication,
    '4' : ReporterDetailsScene,
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
