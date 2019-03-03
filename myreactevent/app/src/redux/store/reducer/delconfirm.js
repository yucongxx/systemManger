import * as types from '../../actioncreators/actiontypes';

const obj = {
    delData: {
        display: 'none',
    },
    id: []
};


function removeshow(state = obj, action) {
    switch (action.type) {
        case types.PROREMOVESHOW:
            let { show, id } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.delData.display = show;
            newState.id = id;
            return newState;
        case types.REMOVECANCEL:
            let newState1 = JSON.parse(JSON.stringify(state));
            newState1.delData.display = 'none';
            newState1.id = [];
            return newState1;
        case types.REMOVEENSURE:
            let newState2 = JSON.parse(JSON.stringify(state));
            let { data, recycleArr, id: id1 } = action;
            if (data.data.code === 0) {
                newState2.delData.display = 'none';
                newState2.id = [];
            }
            // recycleArr.forEach((e, i) => {
            //     id1.forEach((e1, i1) => {
            //         if (e1 === e.id) {
            //             recycleArr.splice(i1, 1);
            //         }
            //     })
            // })
            return newState2;
        default:
            return state
    }
};


export default removeshow;
