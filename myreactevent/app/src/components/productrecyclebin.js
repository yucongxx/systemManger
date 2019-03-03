import React, { Component } from 'react';
import Refresh from './productComponents/refresh';
import ProductSearch from './productComponents/productsearch';
import ProductListMiddleCycle from './productComponents/productcomplistmiddlerecycle';
import ProductListViewBottom from './productComponents/productcomplistbottom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../redux/actioncreators/actioncreators';


class ProductRecycleBin extends Component {
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
                    <ProductListMiddleCycle />
                    <ProductListViewBottom />
                    <div className="slogan">CopyRight @ logo 2015 - 2017</div>
                </div>
            </div>
        )
    }
}


export default connect(state => {
    return {
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(ProductRecycleBin);