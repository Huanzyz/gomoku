import { store } from '../index'

export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const MODAL_ERROR = 'MODAL_ERROR'
export const MODAL_CLEAR_ERROR = 'MODAL_CLEAR_ERROR'

export const modal_open = (type) => ({
    type: MODAL_OPEN,
    modalType: type
})
export const modal_close = () => dispatch => {
    if(store.getState().room.loading !== true)
        dispatch({
            type: MODAL_CLOSE
        })
}
export const modal_error = (error) => ({
    type: MODAL_ERROR,
    error
})
export const modal_clear_error = () => ({
    type: MODAL_CLEAR_ERROR
})


