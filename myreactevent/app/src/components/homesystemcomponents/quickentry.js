import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class QuickEntry extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/home/addproduct">
                        <i className="iconfont icon-tianjia"></i>
                        <div>添加商品</div>
                    </Link>
                </li>
                <li>
                    <Link to="/home/orderlist">
                        <i className="iconfont icon-dingdanliebiao"></i>
                        <div>订单列表</div>
                    </Link>
                </li>
                <li>
                    <Link to="/home/accountsetting">
                        <i className="iconfont icon-yonghuguanli"></i>
                        <div>账户设置</div>
                    </Link>
                </li>
                <li>
                    <Link to="/home/productlist">
                        <i className="iconfont icon-shangpinliebiao"></i>
                        <div>商品列表</div>
                    </Link>
                </li>
                <li>
                    <Link to="/home/productaudit">
                        <i className="iconfont icon-shenhe"></i>
                        <div>商品审核</div>
                    </Link>
                </li>
                <li>
                    <Link to="/home/productrecycle">
                        <i className="iconfont icon-shangpinhuishouzhan"></i>
                        <div>商品回收</div>
                    </Link>
                </li>
            </ul>
        )
    }
}


export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        orderlist: state.orderlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(QuickEntry));