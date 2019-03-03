import * as types from '../../actioncreators/actiontypes';

const obj = {
    informationArr: [
        {
            id: 0,
            name: '商品名称',
            value: '',
            type: 'text',
            hname: 'pName'
        },
        {
            id: 1,
            name: '副标题',
            value: '',
            type: 'text',
            hname: 'subtitle'
        },
        {
            id: 2,
            name: '商品品牌',
            value: '',
            type: 'text',
            hname: 'pBrand'
        },
        {
            id: 3,
            name: '商品介绍',
            value: '',
            type: 'textarea',
            hname: 'pIntroduction'
        },
        {
            id: 4,
            name: '商品货号',
            value: '',
            type: 'text',
            hname: 'pId'
        },
        {
            id: 5,
            name: '商品售价',
            value: '',
            type: 'text',
            hname: 'pPrice'
        },
        {
            id: 6,
            name: '商品库存',
            value: '',
            type: 'text',
            hname: 'pInventory'
        },
        {
            id: 7,
            name: '赠送优币',
            value: '',
            type: 'text',
            hname: 'pIntegral'
        },
        {
            id: 8,
            name: '新品推荐',
            newPro: false,
            type: 'checkbox',
            hname: 'newPro'
        },
        {
            id: 9,
            name: '商品备注',
            value: '',
            type: 'textarea',
            hname: 'pRemark'
        }
    ],
    proEditId: ''
};

function addproduct(state = obj, action) {
    switch (action.type) {
        case types.ADDVALUE:
            let { id, genre, value } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.informationArr.forEach(ele => {
                if (id === ele.id && genre !== 'checkbox') {
                    ele.value = value;
                } else if (id === ele.id && genre === 'checkbox') {
                    ele.put = value;
                }
            });
            return newState;
        case types.PRODUCTEDIT:
            let { id: editId } = action;
            state.proEditId = editId;
            return state
        default:
            return state;
    }
}

export default addproduct;