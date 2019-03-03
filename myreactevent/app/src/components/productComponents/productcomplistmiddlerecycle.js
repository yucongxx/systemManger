import React, { Component } from 'react';
import DelConfirm from '../delconfirm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductCompListMiddleRecycle extends Component {
    toggleFn = (id) => {
        let { toggle, location: { pathname } } = this.props;
        toggle(id, pathname);
    };
    restore = async (id) => {
        let { productstore, init, getPage, setPage, gettotal, location: { pathname } } = this.props;
        let restoreArr = [];
        restoreArr.push(id);
        await productstore(restoreArr, false);
        await init(pathname);
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
    };
    remove = (id) => {
        let { removeshow } = this.props;
        let removeData = [];
        removeData.push(id);
        removeshow(removeData, 'block')
    }
    componentDidMount() {
        let { init, location: { pathname } } = this.props;
        init(pathname);

    };
    render() {
        let { productlist: { recycleArr, num } } = this.props;
        let productRecycleTable = recycleArr.map((e, i) => {
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
                    <td>{e.pId}</td>
                    <td className="proOperation">
                        <ul>
                            <li>
                                <a
                                    href="javascript:;"
                                    onClick={() => { this.restore(e.id) }}
                                >还原</a>
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
                            <th>货号</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productRecycleTable}
                    </tbody>
                </table>
                <DelConfirm />
            </div>
        )
    }
}


export default withRouter(connect(state => {
    return {
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(ProductCompListMiddleRecycle));