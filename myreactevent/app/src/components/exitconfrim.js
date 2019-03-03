import React, { Component } from 'react';
import '../assets/exitconfirm/exitconfirm.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';
import { withRouter } from 'react-router-dom';

class ExitConfirm extends Component {
    constructor() {
        super();
        this.state = {

        }
    };
    setCookie = (key, val, obj = {}) => {
        let d = new Date();
        let { name, time } = obj;
        switch (name) {
            case 'date':
                d.setDate(d.getDate() + time);
                break;
            case 'minu':
                d.setMinutes(d.getMinutes() + time);
                break;
            case 'hour':
                d.setHours(d.getHours() + time);
                break;
            default:
        }
        document.cookie = key + '=' + JSON.stringify(val) + (obj.time ? '; expires=' + d : '');
    };
    rmCookie(key, val) {
        this.setCookie(key, val, { name: 'date', time: -1 });
    }
    cancel = () => {
        let { loginout } = this.props;
        let hide = 'none'
        loginout(hide);
    };
    ensure = () => {
        let { loginout } = this.props;
        this.rmCookie('user');
        sessionStorage.removeItem('user');
        this.props.history.replace('/');
        let hide = 'none'
        loginout(hide);

    };
    render() {
        let { loginoutS } = this.props;
        return (
            <div style={loginoutS.loginoutData}>
                <div className="mask">
                </div>
                <div className="exitconfirm">
                    <div className="exitTop clearfix">
                        退出确认
                         <i
                            className="iconfont icon-guanbi"
                            onClick={this.cancel}
                        ></i>
                    </div>
                    <div className="exitContent">确定要退出登录吗</div>
                    <div className="exitBottom">
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


export default withRouter(connect(state => {
    return {
        loginoutS: state.loginoutS
    }
}, dispatch => {
    return bindActionCreators(actionCreators, dispatch)
})(ExitConfirm));