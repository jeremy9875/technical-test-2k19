import { SET_GAME_DATA } from './type';
import { SET_GAME_DATAV } from './type';
import { SET_GAME_RESULT } from './type';

export const set_game_data = function(data) {
    return {
        type: SET_GAME_DATA,
        content: data,
    };
}

export const set_game_datav = function(data) {
    return {
        type: SET_GAME_DATAV,
        content: data,
    };
}

export const set_game_result = function(data) {
    return {
        type: SET_GAME_RESULT,
        content: data,
    };
}

export function get_game_data(params) {
    return function(dispatch) {
        return fetch('http://localhost:4243/loopgametext', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).then((resp, err) => {
            if (err) {
                console.log(error);
            }
            return resp.json();
        }).then(resp => {
            let content = resp.data;
            dispatch(set_game_data(content));
            return resp;
        })
    }
}

export function get_game_datav(params) {
    return function(dispatch) {
        return fetch('http://localhost:4243/loopgamespeech', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).then((resp, err) => {
            if (err) {
                console.log(error);
            }
            return resp.json();
        }).then(resp => {
            let content = resp.data;
            dispatch(set_game_data(content));
            return resp;
        })
    }
}

export function get_game_result() {
    return function(dispatch) {
        return fetch('http://localhost:4243/result_game', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((resp, err) => {
            if (err) {
                console.log(error);
            }
            return resp.json();
        }).then(resp => {
            let content = resp;
            dispatch(set_game_result(content));
            return resp;
        })
    }
}