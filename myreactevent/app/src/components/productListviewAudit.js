import React, { Component } from 'react';
import '../assets/indexcss/productlist/checkedstyle.css';
import '../assets/indexcss/productlist/contentProduct.css';
import '../assets/indexcss/productlist/pagination.css';
import ProductSearch from './productComponents/productsearch';
import ProductListMiddleAudit from './productComponents/productcomplistmiddleAudit';
import ProductListViewBottom from './productComponents/productcomplistbottom';
import Refresh from './productComponents/refresh';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';


class ProductListViewAudit extends Component {
    render() {
        return (
            <div id="productList">
                <div className="pLTop">
                    <Refresh />
                </div>
                <ProductSearch />
                <div className="productListView">
                    <div className="productListViewTop">
                        <i className="iconfont icon-liebiao"></i>
                        <span>商品列表</span>
                    </div>
                    <ProductListMiddleAudit />
                    <ProductListViewBottom />
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
}))(ProductListViewAudit);