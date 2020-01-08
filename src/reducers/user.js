import {
    USER_INFO,
    USER_ERROR,
    USER_CLEAR_ERROR
} from '../actions/user'

const initUser = () => {
    return {
        username: "Den Vau",
        avatar: `${process.env.PUBLIC_URL}/images/a3.svg`,
        rank: 1,
        point: 1000000,
        countWin: 100,
        countDraw: 10,
        countLoose: 30,
        error: false,
        alert: {
            title: "",
            detail: ""
        }
    }
}
const user = (state = initUser(), action) => {
    switch(action.type){
        case USER_INFO:
            return {
                user: action.user
            }
        case USER_ERROR:
            return {...state, error: true, alert: action.alert}
        case USER_CLEAR_ERROR:
            return {...state, error: false, alert: ""}
        default:
            return state;
    }
}

export default user;