import React from 'react';

import { StackNavigator } from 'react-navigation';

import ListScreen from './src/pages/ListScreen';
import WebScreen from './src/pages/WebScreen';

const SimpleApp = StackNavigator({
  Home: { screen: ListScreen },
  Web: { screen: WebScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
