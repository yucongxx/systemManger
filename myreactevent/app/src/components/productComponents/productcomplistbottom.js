import React, { Component } from 'react';
import AuditBottom from './productbottomcomponents/auditbottom';
import ProductOperaBottom from './productbottomcomponents/productoperabottom';
import RemoveBottom from './productbottomcomponents/removebottom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductListBotttom extends Component {
    constructor() {
        super();
        this.state = {

        }
    };
    selectAll = (ev) => {
        let { checkedAll, location: { pathname } } = this.props;
        checkedAll(ev, pathname);
    };
    changePage = async (pagenum) => {
        let { location: { pathname }, init, getPage, setPage, productlist: { searchOnoff }, productsearch } = this.props;
        console.log(this.props);
        if (!searchOnoff) {
            await init(pathname, pagenum);
            await getPage();
            await setPage();
        } else {
            productsearch(pathname, pagenum);
        }

    };
    skipPage = (ev) => {
        let { location: { pathname }, init, productlist: { page } } = this.props;
        let pageAcount = ev.target.value * 1;
        if (pageAcount <= page && pageAcount > 0) {
            init(pathname, pageAcount);
        } else {
            alert('请输入正确的页码');
        }
    };
    async componentDidMount() {
        let { getPage, setPage, gettotal, location: { pathname } } = this.props;
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
    }
    render() {
        // console.log(this.props);
        let arr = null;
        let alldata = null;
        let massopera = null;
        let { productlist: { productInfoArr, productAuditArr, recycleArr, PageArr, num, page, totalAmount }, location: { pathname } } = this.props;
        if (pathname === '/home/productlist') {
            massopera = <ProductOperaBottom />
            arr = productInfoArr;
        } else if (pathname === '/home/productaudit') {
            massopera = <AuditBottom />
            arr = productAuditArr;
        } else if (pathname === '/home/productrecycle') {
            massopera = <RemoveBottom />
            arr = recycleArr
        }
        if (arr && arr.length === 0) {
            alldata = false;
        } else if (arr && arr.lenght !== 0) {
            alldata = arr.every(e => e.checked);
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
                {massopera}
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
        addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(ProductListBotttom));