import { RECEIVE_USER } from '../actions/session_actions'

const currentAritstReducer = (state = [], action) => {
    Object.freeze(state)
    
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        default:
            return state
    }
}

export default currentAritstReducer;