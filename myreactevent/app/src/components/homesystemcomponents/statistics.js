import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class Statistics extends Component {
    componentDidMount() {
        let { orderData } = this.props;
        orderData();
    };
    render() {
        let { orderlist: { orderData, saleAmount, orderTotal, saleOneWeekAmount }, } = this.props;
        return (
            <ul className="clearfix">
                <li>
                    <i className="iconfont icon-dingdan"></i>
                    <span>今日订单总数</span>
                    <div>{orderData.length}</div>
                </li>
                <li>
                    <i className="iconfont icon-dingdan1"></i>
                    <span>合计订单总数</span>
                    <div>{orderTotal.length}</div>
                </li>
                <li>
                    <i className="iconfont icon-qianbi"></i>
                    <span>今日销售总额</span>
                    <div>{'￥' + saleAmount+'.00'}</div>
                </li>
                <li>
                    <i className="iconfont icon-tubiao"></i>
                    <span>近7天销售总额</span>
                    <div>{'￥' + saleOneWeekAmount+'.00'}</div>
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
})(Statistics));