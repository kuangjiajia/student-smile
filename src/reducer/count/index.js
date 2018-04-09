import { ADD, REDUCE, add, reduce} from './action.js'

const initialState = 0

export default (state = initialState, action ) => {
    switch(action.type) {
        case ADD:{
            console.log(12345)
            return state + 1
        }
        case REDUCE: {
            return state-1
        }
        default:
            return state
    }
}