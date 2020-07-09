import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import menu from './menu'
import games from './games'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "menu" component = {menu} title = "menu" initial = {true} />
         <Scene key = "games" component = {games} title = "games" />
      </Scene>
   </Router>
)
export default Routes