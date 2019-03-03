import React, { Component } from 'react';
import '../assets/delconfirm/delconfirm.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../redux/actioncreators/actioncreators';


class DelConfirm extends Component {
    cancel = () => {
        let { removecancel } = this.props;
        removecancel();
    };
    ensure = async () => {
        let { removeensure, init, getPage, setPage, gettotal, location: { pathname } } = this.props;
        await removeensure();
        await init(pathname);
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
    }
    render() {
        let { delconfirm } = this.props;
        return (
            <div style={delconfirm.delData}>
                <div className="delMask">
                </div>
                <div className="delConfirm">
                    <div className="delTop clearfix">
                        删除确认
                         <i
                            className="iconfont icon-guanbi"
                            onClick={this.cancel}
                        ></i>
                    </div>
                    <div className="delContent">确定要删除吗</div>
                    <div className="delBottom">
                        <a
                            href="javascript:;"
                            onClick={this.cancel}
                        >取消</a>
                        <a
                            href="javascript:;"
                            onClick={this.ensure}
                        >确定</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter((connect(state => {
    return {
        delconfirm: state.delconfirm
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(DelConfirm));