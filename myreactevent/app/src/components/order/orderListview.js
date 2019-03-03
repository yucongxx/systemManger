import React, { Component } from 'react';
import '../../assets/indexcss/productlist/checkedstyle.css';
import '../../assets/indexcss/productlist/contentProduct.css';
import '../../assets/indexcss/productlist/pagination.css';
import OrderSearch from './orderListComponents/ordersearch';
import OrderListMiddle from './orderListComponents/ordercomplistmiddle';
import OrderListBottom from './orderListComponents/ordercomplistbottom';
import Refresh from '../productComponents/refresh';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';

class ProductListView extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div id="productList">
                <div className="pLTop">
                    <Refresh />
                </div>
                <OrderSearch />
                <div className="productListView">
                    <div className="productListViewTop">
                        <i className="iconfont icon-liebiao"></i>
                        <span>数据列表</span>
                    </div>
                    <OrderListMiddle />
                    <OrderListBottom />
                    <div className="slogan">CopyRight @ logo 2015 - 2017</div>
                </div>
            </div>
        )
    }
}

export default (connect(state => {
    return {
        addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(ProductListView);