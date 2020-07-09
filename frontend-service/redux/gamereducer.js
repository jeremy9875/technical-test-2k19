import { combineReducers } from "redux";
import { SET_GAME_DATA } from './type';
import { SET_GAME_DATAV } from './type';
import { SET_GAME_RESULT } from './type';

const initialState = {
    data: ""
}

const gameReducers = (state=initialState, action) => {
    switch(action.type) {
        case SET_GAME_DATA:
            return {
                data: action.content
            }
        case SET_GAME_DATAV:
            return {
                data: action.content
            }
        case SET_GAME_RESULT:
            return {
                data: action.content
            }
        default: return (state);
    }
}

export default combineReducers({
    games: gameReducers,
})