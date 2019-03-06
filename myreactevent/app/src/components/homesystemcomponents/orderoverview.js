import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class OrderView extends Component {
    async componentDidMount() {
        let { ordergettotal, orderData } = this.props;
        await ordergettotal();
        await orderData();
    };
    render() {
        // console.log(this.props);
        let { orderlist: { orderData, oneweekOrder, pendingshowsecond,orderTotal } } = this.props;
        return (
            <div className="mCProductViewR ">
                <div>订单总览</div>
                <ul className="clearfix">
                    <li>
                        <p>{orderData.length}</p>
                        <p>今日新增</p>
                    </li>
                    <li>
                        <p>{oneweekOrder.length}</p>
                        <p>近7天新增</p>
                    </li>
                    <li>
                        <p>{pendingshowsecond[0].amountArr.length}</p>
                        <p>已完成</p>
                    </li>
                    <li>
                        <p>{orderTotal.length}</p>
                        <p>订单总数</p>
                    </li>
                </ul>
            </div>
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
})(OrderView));