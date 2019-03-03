import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../redux/actioncreators/actioncreators';


class OrderListBotttom extends Component {
    constructor() {
        super();
        this.state = {

        }
    };
    selectAll = (ev) => {
        let { orderall } = this.props;
        orderall(ev);
    };
    changePage = async (pagenum) => {
        let { orderlistinit, ordergetpage } = this.props;
        await orderlistinit(pagenum);
        await ordergetpage();
        // if (!searchOnoff) {

        // } else {
        //     productsearch(pathname, pagenum);
        // }
    };
    // skipPage = (ev) => {
    //     let { location: { pathname }, init, productlist: { page } } = this.props;
    //     let pageAcount = ev.target.value * 1;
    //     if (pageAcount <= page && pageAcount > 0) {
    //         init(pathname, pageAcount);
    //     } else {
    //         alert('请输入正确的页码');
    //     }
    // };
    async componentDidMount() {
        let { ordergettotal, ordergetpage } = this.props;
        await ordergetpage();
        await ordergettotal()
    }
    render() {
        let alldata = null;
        let massopera = null;
        let { orderlist: { PageArr, num, page, orderInfoArr, totalAmount } } = this.props;
        if (orderInfoArr && orderInfoArr.length === 0) {
            alldata = false;
        } else if (orderInfoArr && orderInfoArr.length !== 0) {
            alldata = orderInfoArr.every(e => e.checked);
        }
        let pageList = PageArr.map((e, i) => {
            return (
                <li
                    key={i}
                    className={num === e ? 'active' : ''}
                >
                    <a
                        href="javascript:;"
                        onClick={() => { this.changePage(e) }}
                    >{e}</a>
                </li>
            )
        })
        return (
            <div className="productListViewBottom">
                <input
                    type="checkbox"
                    className="productAll"
                    id="cbtest"
                    checked={alldata}
                    onChange={this.selectAll}
                />
                <label
                    htmlFor="cbtest"
                    className="check-all"
                ></label>
                <span className="productAll" >全选</span>
                <div className="mass">
                    <a
                        href="javascript:;"
                        className="confirmOperation"
                        onClick={this.massmoveensure}
                    >关闭订单</a>
                    <a
                        href="javascript:;"
                        className="confirmOperation"
                        onClick={this.massmoveensure}
                    >删除订单</a>
                </div>
                <span className="pageDescribe">共<span>{page}</span>页/<span>{totalAmount}</span>条数据</span>
                <div className="container page">
                    <div className="pagination">
                        <ul className="clearfix">
                            {pageList}
                        </ul>
                    </div>
                </div>
                <div className="skipPage">
                    <span>跳至</span>
                    <input
                        type="text"
                        onBlur={this.skipPage}
                    />
                    <span>页</span>
                </div>
            </div>
        )
    }
}

export default withRouter((connect(state => {
    return {
        orderlist: state.orderlist,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(OrderListBotttom));