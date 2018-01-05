import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, WebView, ScrollView, NetInfo, BackHandler } from 'react-native';
import AppStyles from '../styles/AppStyles'
import { changeConnection, uploadCompletedReports, login } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'

class NewsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'News',
      headerRight: (
        <Button
          title="Close"
          onPress={
            () => navigation.goBack(null)
          }
        />
      )
    }
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { news } = this.props
    const newsContent = news != null ? news.content : " No news yet. "
    return (
      <WebView source={{ html : newsContent }} />
    );
  }

}

const mapStateToProps = state => {
  return {
    currentRoute: state.appState.currentRoute,
    news: state.appState.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScene)

/*
<ScrollView style={ AppStyles.scrollContainer }>
  <Text style={ AppStyles.headerText }>Medicines Control Authourity of Zimbabwe</Text>
  <Text>News</Text>
</ScrollView>*/
