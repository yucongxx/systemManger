import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../redux/actioncreators/actioncreators';


class ProductOperaBottom extends Component {
    change = (ev) => {
        console.log(ev.target.value)
    };
    massmoveensure = async () => {
        let { productlist: { productInfoArr }, productdelete, init, getPage, setPage, gettotal, location: { pathname } } = this.props;
        let productCheckedArr = []
        productInfoArr.forEach((e, i) => {
            if (e.checked) {
                productCheckedArr.push(e.id)
            } else {
                console.log('请勾选要批量操作的商品');
            }
        })
        if (productInfoArr.length) {
            await productdelete(productCheckedArr, true);
            await init(pathname);
            await getPage(pathname);
            await setPage();
            await gettotal(pathname);
        }
    }
    render() {
        return (
            <div className="mass">
                <select
                    className="massOperation"
                    placeholder="批量操作"
                    onChange={(ev) => { this.change(ev) }}
                >
                    <option value="moverecycle">移入回收站</option>
                </select>
                <a
                    href="javascript:;"
                    className="confirmOperation"
                    onClick={this.massmoveensure}
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
}))(ProductOperaBottom));