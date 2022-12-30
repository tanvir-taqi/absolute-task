

const initialState = false
const darkToggleMode = (state = initialState , action)=>{
    switch(action.type){
        case 'DARKMODE' : return !state
        default: return state

    }
}

export default darkToggleMode