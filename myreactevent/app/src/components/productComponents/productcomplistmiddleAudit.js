import React, { Component } from 'react';
import AuditConfirm from '../auditconfirm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductListMiddleAudit extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        let { init, location: { pathname } } = this.props;
        init(pathname);
    };
    toggleFn = (id) => {
        let { toggle, location: { pathname } } = this.props;
        toggle(id, pathname);
    };
    audit = async (id) => {
        let { proaudit, } = this.props;
        let auditArr = [];
        auditArr.push(id)
        await proaudit('block', auditArr);
    };
    render() {
        let { productlist: { productAuditArr, num } } = this.props;
        let productTable = productAuditArr.map((e, i) => {
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
                    <td>{((i + 1) + 6 * (num - 1)) < 10 ? '0' + ((i + 1) + 6 * (num - 1)) : ((i + 1) + 6 * (num - 1))}</td>
                    <td>
                        {e.pId}
                    </td>
                    <td>{e.pName}</td>
                    <td>{`￥${e.pPrice}`.match(/\./) ? `￥${e.pPrice}` : `￥${e.pPrice}.00`}</td>
                    <td>{e.pBrand}</td>
                    <td>{e.pInventory}</td>
                    <td className="proAudit">
                        <p>{e.audit ? '已审核' : '未审核'}</p>
                    </td>
                    <td className="proOperation">
                        <ul>
                            <li>
                                <a
                                    href="javascript:;"
                                    onClick={() => { this.audit(e.id) }}
                                >审核</a>
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
                            <th>编号</th>
                            <th>商品货号</th>
                            <th>商品名称</th>
                            <th>价格</th>
                            <th>品牌</th>
                            <th>库存</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productTable}
                    </tbody>
                </table>
                <AuditConfirm />
            </div>
        )
    }
}



export default withRouter((connect(state => {
    return {
        addproduct: state.addproduct,
        productlist: state.productlist,
        auditconfirm: state.auditconfirm
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(ProductListMiddleAudit));