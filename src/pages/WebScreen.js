import React from 'react';

import {Text, View, WebView } from 'react-native';

export default class WebScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView source={{uri: params.url}} style={{marginTop: 0}} />
    );
  }
}