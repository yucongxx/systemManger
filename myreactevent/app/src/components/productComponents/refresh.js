import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actioncreators/actioncreators';


class Refresh extends Component {
    refresh = () => {
        this.forceUpdate();
    };
    render() {
        return (
            <a
                href="javascript:;"
                className="refresh"
                onClick={this.refresh}
            >
                <i className="iconfont icon-shuaxin"></i>
                <span>刷新</span>
            </a>
        )
    }
}


export default (connect(state => {
    return {
        addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(Refresh);