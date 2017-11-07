import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import AppStyles from '../styles/AppStyles'
import SectionAScene from './aefi-inv/SectionAScene'
import SectionBScene from './aefi-inv/SectionBScene'
import SectionCScene from './aefi-inv/SectionCScene'
import SectionDScene from './aefi-inv/SectionDScene'
import SectionEScene from './aefi-inv/SectionEScene'
import SectionFScene from './aefi-inv/SectionFScene'
import SectionGScene from './aefi-inv/SectionGScene'
import SectionHScene from './aefi-inv/SectionHScene'

export default class AEFIInvFormScene extends PureComponent {
  static navigationOptions = {
    title: 'AEFI Investigation Form',
  }
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Section A' },
      { key: '2', title: 'Section B' },
      { key: '3', title: 'Section C' },
      { key: '4', title: 'Section D' },
      { key: '5', title: 'Section E' },
      { key: '6', title: 'Section F' },
      { key: '7', title: 'Section G' },
      { key: '8', title: 'Section H' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} scrollEnabled style={AppStyles.tabbar} />;

  _renderScene = SceneMap({
    '1': SectionAScene,
    '2': SectionBScene,
    '3' : SectionCScene,
    '4' : SectionDScene,
    '5' : SectionEScene,
    '6' : SectionFScene,
    '7' : SectionGScene,
    '8' : SectionHScene
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
