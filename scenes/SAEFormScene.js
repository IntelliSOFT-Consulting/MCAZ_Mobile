import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import SectionAScene from './sae/SectionAScene'
import SectionBScene from './sae/SectionBScene'
import SectionCScene from './sae/SectionCScene'
import SectionDScene from './sae/SectionDScene'

export default class SAEScene extends PureComponent {
  static navigationOptions = {
    title: 'SAE Report form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Section A' },
      { key: '2', title: 'Section B' },
      { key: '3', title: 'Section C' },
      { key: '4', title: 'Section D' }
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} labelStyle={ AppStyles.tablabelStyle } />;

  _renderScene = SceneMap({
    '1': SectionAScene,
    '2': SectionBScene,
    '3' : SectionCScene,
    '4' : SectionDScene,
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
