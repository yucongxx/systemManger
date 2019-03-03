import React, { Component } from 'react';
import AuditDetail from '../auditDetail';
// import DelConfirm from '../delconfirm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductListMiddle extends Component {
    componentDidMount() {
        let { init, location: { pathname } } = this.props;
        // console.log(this.props);
        init(pathname);
    };
    toggleFn = (id) => {
        let { toggle, location: { pathname } } = this.props;
        toggle(id, pathname);
    };
    detail = (id) => {
        let { auditlist, productlist: { num } } = this.props;
        auditlist(id, num);
    }
    proEdit = (id) => {
        let { productedit } = this.props;
        productedit(id);
        this.props.history.push('/home/modifyproduct');
    };
    remove = async (id) => {
        let { productdelete, getPage, init, setPage, gettotal, location: { pathname } } = this.props;
        let productCheckedArr = [];
        productCheckedArr.push(id);
        await productdelete(productCheckedArr, true);
        await init(pathname);
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
    }

    render() {
        let { productlist: { productInfoArr, num } } = this.props;
        let productTable = productInfoArr.map((e, i) => {
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
                    <td>{e.pId} </td>
                    <td>{e.pName}</td>
                    <td>{`￥${e.pPrice}`.match(/\./) ? `￥${e.pPrice}` : `￥${e.pPrice}.00`}</td>
                    <td>{e.pBrand}</td>
                    <td>{e.pInventory}</td>
                    <td className="proAudit">
                        <p>{e.audit ? '已审核' : '未审核'}</p>
                        <a
                            href="javascript:;"
                            onClick={() => { this.detail(e.id) }}
                        >审核详情</a>
                    </td>
                    <td className="proOperation">
                        <ul>
                            <li>
                                <a
                                    href="javascript:;"
                                    onClick={() => { this.proEdit(e.id) }}
                                >编辑</a>
                            </li>
                            <li>
                                <a
                                    href="javascript:;"
                                    onClick={() => { this.remove(e.id) }}
                                >删除</a>
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
                <AuditDetail />
            </div>
        )
    }
}



export default withRouter((connect(state => {
    return {
        addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(ProductListMiddle));