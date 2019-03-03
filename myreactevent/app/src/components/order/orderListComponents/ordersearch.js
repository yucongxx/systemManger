import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioncreators from '../../../redux/actioncreators/actioncreators';

class ProductSearch extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    contentChagne = () => {
        
    };
    render() {
        return (
            <div className="productSearch">
                <div className="productSearchTop">
                    <i className="iconfont icon-sousuo"></i>
                    <span>筛选查询</span>
                    <a
                        href="javascript:;"
                        className="searchResult"
                        onClick={this.search}
                    >查询结果</a>
                </div>
                <div className="productSearchMiddle">
                    <ul className="clearfix">
                        <li>
                            <span>输入搜索:</span>
                            <input
                                type="text"
                                placeholder="订单编号"
                                onChange={this.contentChagne}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        proSearch: state.proSearch
    }
}, (dispatch) => {
    return bindActionCreators(actioncreators, dispatch)
})(ProductSearch));