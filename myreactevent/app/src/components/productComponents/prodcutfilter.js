import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class ProductFilter extends Component{
    render(){
        return(
            <div className="productFilter">
                <ul className="clearfix">
                    <li>
                        <div>全部商品(<span>1000</span>)</div>
                    </li>
                    <li>
                        <div>待审核(<span>1000</span>)</div>
                    </li>
                    <li>
                        <div>未通过(<span>1000</span>)</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProductFilter;