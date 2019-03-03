import * as types from './actiontypes';
import axios from 'axios';

//登出功能
export function loginout(show) {
    return {
        type: types.LOGINOUT,
        show
    }
}

//商品部分

//将添加的内容放入redux状态管理存储
export function addvalue(id, genre, value, pathn) {
    return {
        type: types.ADDVALUE,
        id,
        genre,
        value,
        pathn,
    }
}

//往数据库添加数据
export function addgoods() {
    return async (dispatch, getState) => {
        let info = getState();
        let { addproduct: { informationArr } } = info;
        // console.log(informationArr);
        let str = informationArr.map(e => {
            return '&' + e.hname + '=' + e.value;
        })
        str = str.join('');
        informationArr.forEach(e => {
            str = str.replace('undefined', e.put)
        })
        let data = await axios.get('http://localhost:88/api/product?act=add' + str);
        // console.log(data);
        dispatch({
            type: types.ADDGOODS,
            data
        })
    }

}


//修改编辑数据库内容
export function submiteditinfo() {
    return async (dispatch, getState) => {
        let info = getState();
        let arr = [];
        let { addproduct: { informationArr, proEditId } } = info;
        let str = informationArr.map(e => {
            e.value && arr.push(e.value);
            if (e.value) {
                return '&' + e.hname + '=' + e.value;
            }
        });
        if (arr.length === 0) {
            console.log('请输入修改内容');
            return
        }
        str = str.join('');
        informationArr.forEach(e => {
            str = str.replace('undefined', e.put)
        })
        let data = await axios.get('http://localhost:88/api/product?act=edit&id=' + proEditId + '&' + str);
        dispatch({
            type: types.SUBMITEDITINFO,
            data
        })
    }
}



//获取商品列表初始数据
export function init(pathn, page = 1) {
    return async (dispatch, getState) => {
        let data = null;
        if (pathn === '/home/productlist') {
            data = await axios.get('http://localhost:88/api/product?act=get&page=' + page);
        } else if (pathn === '/home/productaudit') {
            data = await axios.get('http://localhost:88/api/product?act=getaudit&page=' + page);
        } else if (pathn === '/home/productrecycle') {
            data = await axios.get('http://localhost:88/api/product?act=getrecycle&page=' + page);
        }
        dispatch({
            type: types.INIT,
            data,
            pathn,
            page
        })
    }
}


//获取商品列表页码
export function getPage(pathn) {
    return async (dispatch, getState) => {
        let data = null;
        if (pathn === '/home/productlist') {
            data = await axios.get('http://localhost:88/api/product?act=get_page_count');
        } else if (pathn === '/home/productaudit') {
            data = await axios.get('http://localhost:88/api/product?act=get_auditpage_count');
        } else if (pathn === '/home/productrecycle') {
            data = await axios.get('http://localhost:88/api/product?act=get_recyclepage_count');
        }
        dispatch({
            type: types.GETPAGE,
            data,
            pathn
        })
    }
}

//设置商品列表页码
export function setPage() {
    return {
        type: types.SETPAGE,
    }
}

//获取数据总数
export function gettotal(pathn) {
    return async (dispatch, getState) => {
        let totalpage = getState().productlist.page;
        console.log(totalpage);
        let data = null;
        if (pathn === '/home/productlist') {
            data = await axios.get('http://localhost:88/api/product?act=get&page=' + totalpage);
        } else if (pathn === '/home/productaudit') {
            data = await axios.get('http://localhost:88/api/product?act=getaudit&page=' + totalpage);
        } else if (pathn === '/home/productrecycle') {
            data = await axios.get('http://localhost:88/api/product?act=getrecycle&page=' + totalpage);
        }
        dispatch({
            type: types.GETTOTAL,
            data,
        })
    }
}

//选择功能
export function toggle(id, pathn1) {
    return {
        type: types.TOGGLE,
        id,
        pathn1
    }
}

//全选功能
export function checkedAll(ev, pathn2) {
    return {
        type: types.CHECKEDALL,
        ev,
        pathn2
    }
}

//商品审核调出弹窗并传id
export function proaudit(show, id) {
    return {
        type: types.PROAUDIT,
        show,
        id
    }
}

//审核取消
export function auditcancel() {
    return {
        type: types.AUDITCANCEL,
    }
}

//审核确认
export function auditensure(auditState) {
    return async (dispatch, getState) => {
        let { auditconfirm: { id } } = getState();
        console.log(getState());
        let data = null;
        for (let i = 0; i < id.length; i++) {
            data = await axios.get('http://localhost:88/api/product?act=audit&id=' + id[i] + '&pPut=' + auditState);
        }
        dispatch({
            type: types.AUDITENSURE,
            auditState,
            id,
            data
        })
    }
}

//查看商品审核详情调出弹窗并传id
export function auditlist(id, page = 1) {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/product?act=get&page=' + page)
        dispatch({
            type: types.AUDITLIST,
            id,
            data
        })
    }
}

//关闭商品审核详情窗口
export function auditdetailcancel() {
    return {
        type: types.AUDITDETAILCANCEL
    }
}

//编辑商品信息
export function productedit(id) {
    return {
        type: types.PRODUCTEDIT,
        id
    }
}


//将商品放入回收站
export function productdelete(id, recycle) {
    return async (dispatch, getState) => {
        let data = null;
        for (let i = 0; i < id.length; i++) {
            data = await axios.get('http://localhost:88/api/product?act=recycle&id=' + id[i] + '&recycle=' + recycle)
        }
        console.log(data);
        dispatch({
            type: types.PRODUCTDELETE,
            id,
            data
        })
    }

}

//将商品从回收站里还原
export function productstore(id, restore) {
    return async (dispatch, getState) => {
        let data = null;
        for (let i = 0; i < id.length; i++) {
            data = await axios.get('http://localhost:88/api/product?act=recycle&id=' + id[i] + '&recycle=' + restore)
        }
        dispatch({
            type: types.PRODUCTRESTORE,
            id,
            data
        })
    }
}

//删除确认框弹出
export function removeshow(id, show) {
    return {
        type: types.PROREMOVESHOW,
        id,
        show
    }
}


//取消删除确认
export function removecancel() {
    return {
        type: types.REMOVECANCEL
    }
}

//将商品从数据库里删除
export function removeensure() {
    return async (dispatch, getState) => {
        let info = getState();
        let { delconfirm: { id }, productlist: { recycleArr } } = info;
        let data = null;
        for (let i = 0; i < id.length; i++) {
            data = await axios.get('http://localhost:88/api/product?act=del&id=' + id[i]);
        }
        dispatch({
            type: types.REMOVEENSURE,
            data,
            id,
            recycleArr
        })
    }
}

//获取所有品牌信息
export function brandlist() {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/product?act=getdata');
        dispatch({
            type: types.BRANDLIST,
            data
        })
    }
}

//添加搜索品牌
export function searchbrand(brand) {
    return {
        type: types.SEARCHBRAND,
        brand
    }
}

//添加搜索内容
export function searchcontent(content) {
    return {
        type: types.SEARCHCONTENT,
        content
    }
}

//搜索商品功能
export function productsearch(pathn, page = 1) {
    return async (dispatch, geState) => {
        let info = geState();
        let { proSearch: { searchBrand, searchContent } } = info;
        let data = null;
        let pagedata = null;
        if (pathn === '/home/productlist') {
            data = await axios.get('http://localhost:88/api/product?act=search&pId=' + searchContent + '&pBrand=' + searchBrand + '&page=' + page);
            pagedata = await axios.get('http://localhost:88/api/product?act=get_page_scount&pId=' + searchContent + '&pBrand=' + searchBrand);
        } else if (pathn === '/home/productaudit') {
            data = await axios.get('http://localhost:88/api/product?act=searchaudit&pId=' + searchContent + '&pBrand=' + searchBrand + '&page=' + page);
            pagedata = await axios.get('http://localhost:88/api/product?act=get_auditpage_scount&pId=' + searchContent + '&pBrand=' + searchBrand);
        } else if (pathn === '/home/productrecycle') {
            data = await axios.get('http://localhost:88/api/product?act=searchrecycle&pId=' + searchContent + '&pBrand=' + searchBrand + '&page=' + page);
            pagedata = await axios.get('http://localhost:88/api/product?act=get_recyclepage_scount&pId=' + searchContent + '&pBrand=' + searchBrand);
        }
        dispatch({
            type: types.PRODUCTSEARCH,
            data,
            pagedata,
            pathn,
            page
        })
    }
}

//改变搜索开关
export function changesearchonoff(onOff) {
    return {
        type: types.CHANGESEARCHONOFF,
        onOff
    }
}


//获取商品数据
export function productdata(){
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/product?act=productget');
        dispatch({
            type: types.PRODUCTDATA,
            data
        })
    }
}


//订单部分
export function orderPurchase() {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/product?act=getpPut');
        dispatch({
            type: types.PROORDERGET,
            data
        })
    }
}

//获取初始数据
export function orderlistinit(page = 1) {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/order?act=get&page=' + page);
        dispatch({
            type: types.ORDERLISTINIT,
            data,
            page
        })
    }
};

//勾选功能
export function ordertoggle(id) {
    return {
        type: types.ORDERTOGGLE,
        id,
    }
}

//操作订单功能
export function orderoperation(id) {
    return async (dispatch, getState) => {
        let info = getState();
        let { orderlist: { orderInfoArr } } = info;
        let data = '';
        let statecode = '';
        for (let i = 0; i < orderInfoArr.length; i++) {
            if (orderInfoArr[i].id === id && orderInfoArr[i].oOrderStatus === 1) {
                statecode = 2
                data = await axios.get('http://localhost:88/api/order?act=changestatus&id=' + id + '&oOrderStatus=' + statecode);
            } else if (orderInfoArr[i].id === id && orderInfoArr[i].oOrderStatus === 0) {
                statecode = 3;
                data = await axios.get('http://localhost:88/api/order?act=changestatus&id=' + id + '&oOrderStatus=' + statecode);
            } else if (orderInfoArr[i].id === id && orderInfoArr[i].oOrderStatus === 3){
                data = await axios.get('http://localhost:88/api/order?act=del&id='+id);
            }
        }
        dispatch({
            type: types.ORDEROPERATION,
            data,
            id,
            statecode
        })
    }
}

//获取页码
export function ordergetpage() {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/order?act=get_page_count');
        console.log(data);
        dispatch({
            type: types.ORDERGETPAGE,
            data
        })
    }
}

//全选功能
export function orderall(ev) {
    return {
        type: types.ORDERALL,
        ev,
    }
}

//获取订单总数
export function ordergettotal() {
    return async (dispatch, getState) => {
        let totalpage = getState().orderlist.page;
        let data = await axios.get('http://localhost:88/api/order?act=get&page=' + totalpage);
        dispatch({
            type: types.ORDERGETTOTAL,
            data,
        })
    }
}

//获取今日订单总数
export function orderData() {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/order?act=getdata');
        dispatch({
            type: types.ORDERDATA,
            data
        })
    }
}


//获取待处理事项
export function getpending() {
    return async (dispatch, getState) => {
        let data = await axios.get('http://localhost:88/api/order?act=getdata');
        let data1 = await axios.get('http://localhost:88/api/product?act=getauditf');
        let data2 = await axios.get('http://localhost:88/api/product?act=getprecyclef');
        dispatch({
            type: types.GETPENDING,
            data,
            data1,
            data2
        })
    }
}


//获取每天的订单数据
export function everydaydata(){
    return {
        type:types.EVERYDAYDATA
    }
}