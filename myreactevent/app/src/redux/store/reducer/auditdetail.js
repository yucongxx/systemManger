import * as types from '../../actioncreators/actiontypes';

const obj = {
    auditDetailData: {
        display: 'none'
    },
    id1: '',
    auditState: [],
}

function auditdetail(state = obj, action) {
    switch (action.type) {
        case types.AUDITLIST:
            let { id, data } = action;
            let newState = JSON.parse(JSON.stringify(state));
            let { auditState, auditDetailData } = newState;
            auditDetailData.display = 'block';
            auditState.push(...data.data);
            newState.id1 = id;
            return newState;
        case types.AUDITDETAILCANCEL:
            let newState1 = JSON.parse(JSON.stringify(state));
            newState1.auditDetailData.display = 'none';
            newState1.auditState = [];
            newState1.id1 = '';
            return newState1;
        default:
            return state
    }
}


export default auditdetail