export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const MODAL_ERROR = 'MODAL_ERROR'

export const modal_open = (type) => ({
    type: MODAL_OPEN,
    type
})
export const modal_close = () => ({
    type: MODAL_CLOSE
})
export const modal_error = (error) => ({
    type: MODAL_ERROR,
    error
})


