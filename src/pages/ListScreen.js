import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { List, ListItem } from "react-native-elements";

export default class ListScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
    }


    static navigationOptions = {
        title: 'List'
    };

    componentDidMount() {
        this.makeRemoteRequestReddit();
    }

    makeRemoteRequestReddit = () => {
        const url = `https://api.reddit.com/r/pictures/new.json`;
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            avatar={{ uri: item.data.thumbnail }}
                            title={item.data.title}
                            subtitle={`${item.data.author} - Score: ${item.data.score} - Comments: ${item.data.num_comments}`}
                            onPress={() => navigate('Web', {
                                url: item.data.url,
                                title: item.data.title
                            })}
                        />
                    )}
                    keyExtractor={item => item.data.id}
                />
            </List>
        );
    }
}