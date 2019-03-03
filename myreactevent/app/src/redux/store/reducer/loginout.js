import * as types from '../../actioncreators/actiontypes';

const obj = {
    loginoutData: {
        display: 'none',
    }
};


function loginout(state = obj, action) {
    switch (action.type) {
        case types.LOGINOUT:
            let { show } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.loginoutData.display = show;
            return newState;
        default:
            return state
    }
};


export default loginout;
