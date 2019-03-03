import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actioncreators from '../../redux/actioncreators/actioncreators';

class ProductSearch extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    brandChange = (ev) => {
        let { searchbrand } = this.props;
        searchbrand(ev.target.value);
    };
    contentChagne = (ev) => {
        let { searchcontent } = this.props;
        searchcontent(ev.target.value);
    };
    search = () => {
        let { proSearch: { searchContent }, productsearch,location:{pathname} } = this.props;
        if (searchContent){
            productsearch(pathname);
        }else{
            alert('请输入搜索内容')
        }
    }
    componentDidMount() {
        let { brandlist } = this.props;
        brandlist();
    };
    render() {
        let { proSearch: { brandList } } = this.props;
        let brand = brandList.map((e, i) => {
            return (
                <option
                    value={e}
                    key={i}
                >{e}</option>
            )
        })
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
                                placeholder="商品货号"
                                onChange={this.contentChagne}
                            />
                        </li>
                        <li>
                            <span>商品品牌:</span>
                            <select
                                name=""
                                className="brandSelect"
                                onChange={this.brandChange}
                            >
                                {brand}
                            </select>
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