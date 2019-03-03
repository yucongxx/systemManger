import * as types from '../../actioncreators/actiontypes';

const obj = {
    productText: [],
    orderInfoArr: [],
    PageArr: [],
    orderData: [],
    orderTotal: [],
    oneweekOrder: [],
    everyDayInOneWData: [
        {
            name: '周日',
            amountArr: []
        },
        {
            name: '周一',
            amountArr: []
        },
        {
            name: '周二',
            amountArr: []
        },
        {
            name: '周三',
            amountArr: []
        },
        {
            name: '周四',
            amountArr: []
        },
        {
            name: '周五',
            amountArr: []
        },
        {
            name: '周六',
            amountArr: []
        }
    ],
    thisWeekAmount: 0,
    page: 1,
    num: 1,
    totalAmount: 0,
    searchOnoff: false,
    saleAmount: 0,
    saleOneWeekAmount: 0,
    pendingshowfirst: [
        {
            name: '待付款订单',
            amountArr: []
        },
        {
            name: '已发货订单',
            amountArr: []
        },
    ],
    pendingshowsecond: [
        {
            name: '已完成订单',
            amountArr: []
        },
        {
            name: '待关闭订单',
            amountArr: []
        }

    ],
    pendingshowthird: [
        {
            name: '待审核商品',
            amountArr: []
        },
        {
            name: '待删除商品',
            amountArr: []
        }
    ]
}


function orderlist(state = obj, action) {
    switch (action.type) {
        case types.PROORDERGET:
            let { data } = action;
            let newState = JSON.parse(JSON.stringify(state));
            newState.productText = data.data;
            return newState;
        case types.ORDERLISTINIT:
            let { data: data1, page } = action;
            let newState2 = JSON.parse(JSON.stringify(state));
            newState2.num = page;
            newState2.orderInfoArr = data1.data;
            return newState2;
        case types.ORDERTOGGLE:
            let { id } = action;
            let newState3 = JSON.parse(JSON.stringify(state));
            newState3.orderInfoArr.forEach(e => {
                if (e.id === id) {
                    e.checked = !e.checked
                }
            })
            return newState3;
        case types.ORDEROPERATION:
            let { id: id1, data: data2, statecode } = action;
            let newState4 = JSON.parse(JSON.stringify(state));
            if (data2.data && data2.data.code === 0) {
                newState4.orderInfoArr.forEach(e => {
                    if (e.id === id1 && e.oOrderStatus === 1) {
                        e.oOrderStatus = statecode
                    } else if (e.id === id1 && e.oOrderStatus === 0) {
                        e.oOrderStatus = statecode
                    } 
                })
            }
            return newState4;
        case types.ORDERGETPAGE:
            let { data: data3 } = action;
            let newState5 = JSON.parse(JSON.stringify(state));
            newState5.page = data3.data.count;
            console.log(newState5.page);
            let pagationArr = [];
            if (newState5.page > 5) {
                for (let i = 1; i <= 5; i++) {
                    if (newState5.num <= 3) {
                        pagationArr.push(i)
                    } else if (newState5.num >= newState5.page - 2) {
                        pagationArr.push(newState5.page - 5 + i)
                    } else {
                        pagationArr.push(newState5.num - 3 + i)
                    }
                }
            } else {
                for (let i = 1; i <= newState5.page; i++) {
                    
                    pagationArr.push(i)
                }
            }
            newState5.PageArr = pagationArr;
            
            return newState5;
        case types.ORDERALL:
            let { ev } = action;
            let newState6 = JSON.parse(JSON.stringify(state));
            newState6.orderInfoArr.forEach(e => {
                e.checked = ev.target.checked;
            })
            return newState6;
        case types.ORDERGETTOTAL:
            let newState7 = JSON.parse(JSON.stringify(state));
            let { data: data4, } = action;
            let { page: page3 } = newState7;
            newState7.totalAmount = data4.data.length ? data4.data.length + (page3 - 1) * 6 : 0;
            return newState7;
        case types.ORDERDATA:
            let newState8 = JSON.parse(JSON.stringify(state));
            let { data: data5 } = action;
            newState8.orderTotal = data5.data;
            let today = new Date();
            let todayYear = today.getFullYear();
            let todayMonth = today.getMonth() + 1;
            let todayDate = today.getDate();
            today = '' + todayYear + todayMonth + todayDate;
            newState8.orderData = data5.data.filter(e => {
                let orderday = new Date(e.time);
                let orderYear = orderday.getFullYear();
                let orderMonth = orderday.getMonth() + 1;
                let orderDate = orderday.getDate();
                orderday = '' + orderYear + orderMonth + orderDate;
                return today === orderday
            })
            newState8.saleAmount = newState8.orderData.reduce((prev, next) => {
                return next.oPrice * 1 + prev
            }, 0);
            newState8.oneweekOrder = data5.data.filter(e => {
                let today = +new Date();
                let orderday = +new Date(e.time);
                return today - orderday < 604800000
            })
            newState8.saleOneWeekAmount = newState8.oneweekOrder.reduce((prev, next) => {
                return next.oPrice * 1 + prev
            }, 0);
            return newState8;
        case types.GETPENDING:
            let newState9 = JSON.parse(JSON.stringify(state));
            let { data1: prodata, data2: recycledata } = action;
            for (let i = 0; i < newState9.pendingshowfirst.length; i++) {
                newState9.pendingshowfirst[i].amountArr = newState9.orderTotal.filter(e => {
                    if (newState9.pendingshowfirst[i].name === '待付款订单') {
                        return e.oOrderStatus === 0;
                    } else if (newState9.pendingshowfirst[i].name === '已发货订单') {
                        return e.oOrderStatus === 1;
                    }
                })
            };
            for (let i = 0; i < newState9.pendingshowsecond.length; i++) {
                newState9.pendingshowsecond[i].amountArr = newState9.orderTotal.filter(e => {
                    if (newState9.pendingshowsecond[i].name === '已完成订单') {
                        return e.oOrderStatus === 2;
                    } else if (newState9.pendingshowsecond[i].name === '待关闭订单') {
                        return e.oOrderStatus === 3;
                    }
                })
            }
            newState9.pendingshowthird[0].amountArr = prodata.data;
            newState9.pendingshowthird[1].amountArr = recycledata.data;
            return newState9;
        case types.EVERYDAYDATA:
            let newState10 = JSON.parse(JSON.stringify(state));
            let { everyDayInOneWData, oneweekOrder } = newState10;
            let mondaydata = 0;
            if (new Date().getDay() === 1) {
                mondaydata = new Date().setHours(0, 0, 0, 0);
                // console.log(mondaydata);
            }
            for (let i = 0; i < everyDayInOneWData.length; i++) {
                everyDayInOneWData[i].amountArr = oneweekOrder.filter(e => {
                    if (+new Date(e.time) > mondaydata) {
                        return new Date(e.time).getDay() === i
                    }
                })
            }
            everyDayInOneWData.push(everyDayInOneWData.shift());
            let thisWeekOrder = everyDayInOneWData.reduce((prev, next) => {
                return prev + next.amountArr.length
            },0)
            newState10.thisWeekAmount = thisWeekOrder;
            // console.log(everyDayInOneWData);
            return newState10;
        default:
            return state;
    }
}



export default orderlist;
