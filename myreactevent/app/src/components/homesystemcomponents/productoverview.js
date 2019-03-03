import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductOverView extends Component {
    componentDidMount() {
        let { productdata } = this.props;
        productdata();
    }
    render() {
        // console.log(this.props);
        let { productlist: { produData: { inventory, newPro, productAll, put}}}=this.props;
        return (
            <div className="mCProductViewL">
                <div>商品总览</div>
                <ul className="clearfix">
                    <li>
                        <p>{put.length}</p>
                        <p>已上架</p>
                    </li>
                    <li>
                        <p>{newPro.length}</p>
                        <p>新品推荐</p>
                    </li>
                    <li>
                        <p>{inventory.length}</p>
                        <p>库存紧张</p>
                    </li>
                    <li>
                        <p>{productAll.length}</p>
                        <p>全部商品</p>
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
})(ProductOverView));