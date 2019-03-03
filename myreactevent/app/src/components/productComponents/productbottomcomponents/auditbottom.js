import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../redux/actioncreators/actioncreators';


class AuditBottom extends Component {
    change = (ev) => {
        console.log(ev.target.value)
    };
    massensure = async () => {
        let { productlist: { productAuditArr }, proaudit, init, getPage, setPage, gettotal, location: { pathname } } = this.props;
        let auditCheckedArr = []
        productAuditArr.forEach((e, i) => {
            if (e.checked) {
                auditCheckedArr.push(e.id);
            } else {
                console.log('请勾选要批量审核的商品');
            }
        })
        auditCheckedArr.length && proaudit('block', auditCheckedArr);
        await init(pathname);
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
    }
    render() {
        return (
            <div className="mass">
                <select
                    className="massOperation"
                    placeholder="批量操作"
                    onChange={(ev) => { this.change(ev) }}
                >
                    <option value="massaudit">审核</option>
                </select>
                <a
                    href="javascript:;"
                    className="confirmOperation"
                    onClick={this.massensure}
                >确定</a>
            </div>

        )
    }
}


export default withRouter((connect(state => {
    return {
        // addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(AuditBottom));