import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../../redux/actioncreators/actioncreators';


class OrderListMiddle extends Component {
    componentDidMount() {
        let { orderlistinit } = this.props;
        orderlistinit();
    };
    timeformat = (time) => {
        let timeinit = new Date(time);
        let year = timeinit.getFullYear();
        let month = timeinit.getMonth() + 1;
        let date = timeinit.getDate();
        let hour = timeinit.getHours();
        let mininutes = timeinit.getMinutes();
        let seconds = timeinit.getSeconds();
        let timestr = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${mininutes < 10 ? '0' + mininutes : mininutes}:${seconds < 10 ? '0' + seconds : seconds}`
        return timestr
    }
    toggleFn = (id) => {
        let { ordertoggle } = this.props;
        ordertoggle(id);
    };
    opera = async (id) => {
        let { orderoperation, orderlistinit, orderlist: { num }, ordergettotal } = this.props;
        console.log(this.props);
        await orderoperation(id);
        await orderlistinit(num);
        await ordergettotal();
    };

    render() {
        let { orderlist: { orderInfoArr } } = this.props;
        let productTable = orderInfoArr.map((e, i) => {
            let payMethod = null;
            let payStatus = null;
            let opera = '';
            switch (e.oPayMethod) {
                case 0:
                    payMethod = '未支付';
                    break;
                case 1:
                    payMethod = '支付宝';
                    break;
                case 2:
                    payMethod = '微信';
                    break;
                default:
                    payMethod = '未支付'
            }
            switch (e.oOrderStatus) {
                case 0:
                    payStatus = '待支付';
                    opera = '关闭订单';
                    break;
                case 1:
                    payStatus = '已发货';
                    opera = '确认收货';
                    break;
                case 2:
                    payStatus = '已完成';
                    opera = '查看订单';
                    break;
                case 3:
                    payStatus = '已关闭';
                    opera = '删除订单';
                    break;
                default:
                    payStatus = '待支付';
                    opera = '关闭订单';
            }

            return (
                <tr key={i}>
                    <td>
                        <input
                            type="checkbox"
                            className="procductCheck"
                            id={"cbtest" + i}
                            checked={e.checked}
                            onChange={() => { this.toggleFn(e.id) }}
                        />
                        <label
                            htmlFor={"cbtest" + i}
                            className="check-box"
                        ></label>
                    </td>
                    <td>{e.oNumber}</td>
                    <td>
                        {this.timeformat(e.time)}
                    </td>
                    <td>{e.oAccount}</td>
                    <td>{`￥${e.oPrice}`.match(/\./) ? `￥${e.oPrice}` : `￥${e.oPrice}.00`}</td>
                    <td>{payMethod}</td>
                    <td className="proAudit">{payStatus}</td>
                    <td className="proOperation">
                        <ul>
                            <li>
                                <a
                                    href="javascript:;"
                                    onClick={() => { this.opera(e.id) }}
                                >{opera}</a>
                            </li>
                        </ul>
                    </td>
                </tr>
            )
        })
        return (
            <div className="productListViewMiddle">
                <table className="dataTable">
                    <thead>
                        <tr>
                            <th>
                                <input className="procductCheck" type="checkbox" name="procductC" />
                                <span></span>
                            </th>
                            <th>订单编号</th>
                            <th>提交时间</th>
                            <th>用户账号</th>
                            <th>订单金额</th>
                            <th>支付方式</th>
                            <th>订单状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productTable}
                    </tbody>
                </table>
            </div>
        )
    }
}



export default withRouter((connect(state => {
    return {
        productlist: state.productlist,
        orderlist: state.orderlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(OrderListMiddle));