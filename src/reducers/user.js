import {
    USER_INFO,
    USER_ERROR,
    USER_CLEAR_ERROR,
    USER_LOGIN_BEGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_BEGIN,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE
} from '../actions/user'

const initUser = () => {
    return {
        user: {
            username: "Den Vau ABC DHEYID",
            avatar: `${process.env.PUBLIC_URL}/images/a10.svg`,
            rank: 1,
            points: 1000000,
            countWin: 100,
            countDraw: 10,
            countLoose: 30,
        }, 
        loading: false,       
        error: false,
        errorInfo: {
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
            return {
                ...state, 
                error: true, 
                errorInfo: action.error
            }
        case USER_CLEAR_ERROR:
            return {
                ...state, 
                error: false, 
                errorInfo: {
                    title: "",
                    detail: ""
                }
            }
        case USER_LOGIN_BEGIN:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false
            }
        case USER_REGISTER_BEGIN:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}

export default user;