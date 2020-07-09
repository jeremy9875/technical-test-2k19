import * as React from 'react';
import { Button, StyleSheet, Text, View, TextInput, Linking } from "react-native";
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { get_game_data, get_game_datav } from './redux/gameaction';

class menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      turn: "",
      lang: "",
      voicepath: "exemple",
    }
    this.handlestartgametext = this.handlestartgametext.bind(this);
    this.handlestartgamevoice = this.handlestartgamevoice.bind(this);
  }

  handlestartgametext() {
    console.log(this.state);
    this.props.get_game_data({
      text: this.state.text, //params front
      turn: this.state.turn,
      lang: this.state.lang}).then(resp => {
        console.log(resp);
      })
      Actions.games();
  }
  handlestartgamevoice() {
    console.log(this.state);
    this.props.get_game_datav({
      voicepath: this.state.voicepath, //params front
      turn: this.state.turn}).then(resp => {
        console.log(resp);
      })
      Actions.games();
  }
  render() {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>texte</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => this.setState({text})} value={this.state.text} placeholder="rentrer votre texte ici" />
    <Text style={styles.title}>Nb tours</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={turn => this.setState({turn})} value={this.state.turn} placeholder="10" />
    <Text style={styles.title}>Choix de la langue</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={lang => this.setState({lang})} value={this.state.lang} placeholder="pt-BR_IsabelaVoice" />

    <Button onPress={this.handlestartgamevoice} title="Start with voice" />
    <Button onPress={this.handlestartgametext} title="Start with text" />
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
const mapDispatchToProps = {
  get_game_data,
  get_game_datav,
}
const menuContainer = connect(null, mapDispatchToProps)(menu);
export default menuContainer