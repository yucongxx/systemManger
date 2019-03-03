import * as types from '../../actioncreators/actiontypes';

let obj = {
    brandList: [],
    searchContent: '',
    searchBrand: ''
}

function proSearch(state = obj, action) {
    switch (action.type) {
        case types.BRANDLIST:
            let newState = JSON.parse(JSON.stringify(state));
            let { data } = action;
            let { brandList } = newState;
            data.data.forEach((e, i) => {
                if (brandList.indexOf(e.pBrand) === -1) {
                    brandList.push(e.pBrand)
                }
            })
            if (brandList.length) newState.searchBrand = brandList[0];
            return newState;
        case types.SEARCHBRAND:
            let newState1 = JSON.parse(JSON.stringify(state));
            let { brand } = action;
            newState1.searchBrand = brand;
            return newState1;
        case types.SEARCHCONTENT:
            let newState2 = JSON.parse(JSON.stringify(state));
            let { content } = action;
            newState2.searchContent = content;
            return newState2;
        default:
            return state
    }
};


export default proSearch;