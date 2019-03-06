import * as types from '../../actioncreators/actiontypes';

const obj = {
    productInfoArr: [],
    productAuditArr: [],
    recycleArr: [],
    PageArr: [],
    page: 1,
    num: 1,
    totalAmount: 0,
    searchOnoff: false,
    produData: {
        put: [],
        newPro: [],
        inventory: [],
        productAll: []
    }
}


function productlist(state = obj, action) {
    let arr = '';
    switch (action.type) {
        case types.INIT:
            let { data, pathn, page: page1 } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.num = page1;
            if (pathn === '/home/productlist') {
                newState.productInfoArr = data.data;
            } else if (pathn === '/home/productaudit') {
                newState.productAuditArr = data.data;
            } else if (pathn === '/home/productrecycle') {
                newState.recycleArr = data.data;
            }
            return newState;
        case types.TOGGLE:
            let { id, pathn1 } = action;
            let newState1 = JSON.parse(JSON.stringify(state));
            if (pathn1 === '/home/productlist') {
                arr = 'productInfoArr'
            } else if (pathn1 === '/home/productaudit') {
                arr = 'productAuditArr'
            } else if (pathn1 === '/home/productrecycle') {
                arr = 'recycleArr'
            }
            newState1[arr].forEach(e => {
                if (e.id === id) {
                    e.checked = !e.checked
                }
            })
            return newState1;
        case types.CHECKEDALL:
            let { ev, pathn2 } = action;
            let newState2 = JSON.parse(JSON.stringify(state));
            if (pathn2 === '/home/productlist') {
                arr = 'productInfoArr'
            } else if (pathn2 === '/home/productaudit') {
                arr = 'productAuditArr'
            } else if (pathn2 === '/home/productrecycle') {
                arr = 'recycleArr'
            }
            newState2[arr].forEach(e => {
                e.checked = ev.target.checked;
            })
            return newState2;
        case types.PRODUCTDELETE:
            let { id: recycleId } = action;
            let newState3 = JSON.parse(JSON.stringify(state));
            let { productInfoArr } = newState3
            return newState3;
        case types.PRODUCTRESTORE:
            let { id: sotreId } = action;
            let newState4 = JSON.parse(JSON.stringify(state));
            let { recycleArr } = newState4
            return newState4;
        case types.GETPAGE:
            let { data: data2, pathn: pathn3 } = action;
            let newState5 = JSON.parse(JSON.stringify(state));
            if (pathn3 === '/home/productlist') {
                newState5.page = data2.data.count;
            } else if (pathn3 === '/home/productaudit') {
                newState5.page = data2.data.count;
            } else if (pathn3 === '/home/productrecycle') {
                newState5.page = data2.data.count;
            }
            return newState5
        case types.SETPAGE:
            // let { page } = action;
            let newState6 = JSON.parse(JSON.stringify(state));
            let { page, num } = newState6;
            // console.log(page);
            let pagationArr = []
            if (page > 5) {
                for (let i = 1; i <= 5; i++) {
                    //如果当前值在3的范围内， 5   3
                    if (num <= 3) {
                        pagationArr.push(i)
                    } else if (num >= page - 2) {
                        pagationArr.push(page - 5 + i)
                    } else {
                        pagationArr.push(num - 3 + i)
                    }
                }
            } else {
                for (let i = 1; i <= page; i++) {
                    pagationArr.push(i)
                }
            }
            newState6.PageArr = pagationArr;
            return newState6;
        case types.GETTOTAL:
            let { data: data3 } = action;
            let newState7 = JSON.parse(JSON.stringify(state));
            let { page: page2 } = newState7;
            newState7.totalAmount = data3.data.length ? data3.data.length + (page2 - 1) * 6 : 0
            return newState7;
        case types.PRODUCTSEARCH:
            let { pathn: pathn4, data: data4, pagedata, page: page3 } = action;
            let newState8 = JSON.parse(JSON.stringify(state));
            let parr = '';
            if (pathn4 === '/home/productlist') {
                parr = 'productInfoArr'
            } else if (pathn4 === '/home/productaudit') {
                parr = 'productAuditArr'
            } else if (pathn4 === '/home/productrecycle') {
                parr = 'recycleArr'
            }
            if (data4.data.length !== 0) {
                newState8[parr] = data4.data;
                newState8.num = page3;
                newState8.page = pagedata.data.count * 1;
                newState8.totalAmount = data4.data.length;
                let spagationArr = []
                if (newState8.page > 5) {
                    for (let i = 1; i <= 5; i++) {
                        //如果当前值在3的范围内， 5   3
                        if (newState8.num <= 3) {
                            spagationArr.push(i)
                        } else if (newState8.num >= newState8.page - 2) {
                            spagationArr.push(newState8.page - 5 + i)
                        } else {
                            spagationArr.push(newState8.num - 3 + i)
                        }
                    }
                } else {
                    for (let i = 1; i <= newState8.page; i++) {
                        spagationArr.push(i)
                    }
                }
                newState8.PageArr = spagationArr;
                newState8.searchOnoff = true;
            } else {
                alert('搜索不到内容')
            }
            return newState8;
        case types.CHANGESEARCHONOFF:
            let newState9 = JSON.parse(JSON.stringify(state));
            let { onOff } = action;
            newState9.searchOnoff = onOff;
            return newState9;
        case types.PRODUCTDATA:
            let { data: data5 } = action;
            let newState10 = JSON.parse(JSON.stringify(state));
            // console.log(data5.data);
            newState10.produData.put = data5.data.filter(e => e.pPut);
            newState10.produData.newPro = data5.data.filter(e => e.newPro);
            newState10.produData.inventory = data5.data.filter(e => e.pInventory <= 10);
            newState10.produData.productAll = data5.data;
            // console.log(newState10.produData);
            return newState10;
        default:
            return state
    }
}

export default productlist;