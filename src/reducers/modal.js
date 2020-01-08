import {
    MODAL_OPEN,
    MODAL_CLOSE,
    MODAL_ERROR
} from '../actions/modal'

// 1: JOIN ROOM [Room's ID, Password]
// 2: JOIN ROOM [Password]
// 3: CREATE ROOM 
const InitModal = () => ({
    isShown: false,
    type: 0,
    error: false,
    errorInfor: {
        title: null,
        detail: null
    }
})

const modal = (state = InitModal(), action) => {
    switch(action.type){
        case MODAL_OPEN:
            return {
                ...state,
                isShown: true,
                type: action.type,
                error: false,
                errorInfo: {
                    title: null,
                    detail: null
                }
            }
        case MODAL_CLOSE:
            return {
                ...state,
                isShown: false,
                roomID: null,
                type: 0,
                error: false,
                errorInfo: {
                    title: null,
                    detail: null
                }
            }
        case MODAL_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorDetail: action.error
            }
        default:
            return state
    }
}
export default modal