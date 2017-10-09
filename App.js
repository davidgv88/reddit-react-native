import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { List, ListItem } from "react-native-elements";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequestReddit();
  }

  makeRemoteRequestReddit = () => {
    const url = `https://api.reddit.com/r/programming/new.json`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data.children,
          error: false,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _openUrl(url){
    console.log(url);
    console.log('pressed anywhere on list item'); 
  } 

  render() {
    return (
      <List>
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            avatar={{ uri: "https://image.freepik.com/free-icon/reddit-logo_318-67806.jpg" }}
            title={item.data.title}
            subtitle={item.data.domain}
            onPress={() => this._openUrl(item.data.url)}

          />
        )}
         keyExtractor={item => item.data.id}
      />
</List>
    );
  }
}


