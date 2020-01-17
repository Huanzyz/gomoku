import {
    RANK_INFO_BEGIN,
    RANK_INFO_SUCCESS,
    RANK_INFO_FAILURE
} from '../actions/rank'

const InitRank = () => ({
    data: [      
    ],
    loading: false
})
const rank = (state = InitRank(), action) => {
    switch(action.type){
        case RANK_INFO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case RANK_INFO_SUCCESS: 
            return{
                ...state,
                data: (action.data),
                loading: false
            }
        case RANK_INFO_FAILURE:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
export default rank