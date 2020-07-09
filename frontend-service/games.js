import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { get_game_result } from './redux/gameaction';

class games extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      dataSource: [],
    }
  }
  componentDidMount() {
    setTimeout(() => {this.props.get_game_result().then(resp => {
        console.log(resp);
        this.setState({
          dataSource: resp,
         })
      }).catch(error=>console.log(error)) //to catch the errors if any
  }, 20000); }
  renderItem=(data, index)=>
  <View>
      <Text> Filename/Text:</Text>
      <Text key={index} style={styles.lightText}>{data.textFilename}</Text>
      <Text>Tours:</Text>
      <Text key={index} style={styles.lightText}>{data.turn}</Text>
      <Text>Similarité:</Text>
      <Text key={index} style={styles.lightText}>{data.similarity}</Text>
    </View>
  render() {
    console.log(this.state.dataSource);
  return (
    <View style={styles.container}>
      {this.state.dataSource.map((data, index) => this.renderItem(data, index))}
  </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
const mapStatetoProps = (State) => ({games:State.games.data});
const mapDispatchtoProps = {get_game_result};
const gamecontainer = connect(mapStatetoProps, mapDispatchtoProps)(games);
export default gamecontainer