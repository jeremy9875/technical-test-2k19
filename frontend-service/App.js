import React, { Component } from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import gamedata from './redux/gamereducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import _ from 'lodash';
import Routes from './Route';

const store = createStore(gamedata, applyMiddleware(thunkMiddleware));
    YellowBox.ignoreWarnings(['componentWillReceiveProps']);
    const _console = _.clone(console);
    console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
     _console.warn(message);
    } 
   };

class mouthgame extends Component {
   render() {
      return (
         <Provider store={store}>
         <Routes />
         </Provider>
      )
   }
}
export default mouthgame
AppRegistry.registerComponent('mouthgame', () => mouthgame)