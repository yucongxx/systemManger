import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class PendingBusiness extends Component {
   async componentDidMount() {
       let { getpending } = this.props;
        getpending();
    };
    render() {
        // console.log(this.props);
        let { orderlist: { pendingshowfirst, pendingshowsecond, pendingshowthird } } = this.props;
        let showfirst = pendingshowfirst.map((e, i) => {
            return (
                <li key={i}>
                    <Link to='/home/orderlist'>
                        <span>{e.name}</span>
                        <span>{'(' + e.amountArr.length + ')'}</span>
                    </Link>
                </li>
            )
        });
        let showSecond = pendingshowsecond.map((e, i) => {
            return (
                <li key={i}>
                    <Link to='/home/orderlist'>
                        <span>{e.name}</span>
                        <span>{'(' + e.amountArr.length + ')'}</span>
                    </Link>
                </li>
            )
        });
        let showThree = pendingshowthird.map((e, i) => {
            return (
                <li key={i}>
                    <Link to='/home/productaudit'>
                        <span>{e.name}</span>
                        <span>{'(' + e.amountArr.length + ')'}</span>
                    </Link>
                </li>
            )
        })
        return (
            <div className="mCPending">
                <div>待处理事务</div>
                <ul className="firstCol">
                    {showfirst}
                </ul>
                <ul className="firstCol">
                    {showSecond}
                </ul>
                <ul className="firstCol">
                    {showThree}
                </ul>
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        orderlist: state.orderlist,
        pending: state.pending
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(PendingBusiness));