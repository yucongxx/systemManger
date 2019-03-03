import * as types from '../../actioncreators/actiontypes';

const obj = {
    confirmData: {
        display: 'none',
    },
    id: [],
    // auditRecord:[]
};


function auditconfirm(state = obj, action) {
    switch (action.type) {
        case types.PROAUDIT:
            let { show, id } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.confirmData.display = show;
            newState.id.push(...id);
            return newState;
        case types.AUDITCANCEL:
            let newState1 = JSON.parse(JSON.stringify(state));
            newState1.confirmData.display = 'none';
            newState1.id = [];
            return newState1;
        case types.AUDITENSURE:
            let { auditState, id:id1,data } = action;
            let newState2 = JSON.parse(JSON.stringify(state));
            newState2.confirmData.display = 'none';
            newState2.id = [];
            // let { code, auditinfo}=data.data
            // if (code === 0) {
            //     newState2.auditRecord.push(auditinfo.info)
            // }
            return newState2
        default:
            return state
    }
};


export default auditconfirm;