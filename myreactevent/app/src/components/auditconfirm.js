import React, { Component } from 'react';
import '../assets/auditconfirm/auditconfirm.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';
import { withRouter } from 'react-router-dom';

class ExitConfirm extends Component {
    constructor() {
        super();
        this.state = {
            auditState: 'fail'
        }
    };
    cancel = () => {
        let { auditcancel } = this.props;
        auditcancel();
    };
    ensure = async () => {
        let { auditensure, auditconfirm: { id }, init, location: { pathname }, getPage, setPage,gettotal } = this.props;
        let { auditState } = this.state;
        await auditensure(auditState, id);
        await init(pathname);
        await getPage(pathname);
        await setPage();
        await gettotal(pathname);
        // this.props.history.push('/home/productlist')
    };
    changeState = (ev) => {
        let { auditState } = this.state;
        auditState = ev.target.value;
        this.setState({ auditState });
    };
    render() {
        let name = '';
        let { auditconfirm: { confirmData, id }, productlist: { productAuditArr } } = this.props;
        productAuditArr.forEach(e => {
            id.forEach(e1 => {
                if (e1 === e.id) {
                    name = e.pName
                }
            })
        })
        return (
            <div style={confirmData}>
                <div className="admask">
                </div>
                <div className="auditconfirm">
                    <div className="auditTop clearfix">
                        商品审核
                         <i
                            className="iconfont icon-guanbi"
                            onClick={this.cancel}
                        ></i>
                    </div>
                    <div className="auditContent">
                        <p>
                            <span>商品名称:</span>
                            <span>{name}</span>
                        </p>
                        <div onChange={this.changeState}>
                            <span>商品审核:</span>
                            <input type="radio" id="pass" name="audit" value="pass" />
                            <label htmlFor="pass">审核通过</label>
                            <input type="radio" id="fail" name="audit" value="fail" defaultChecked />
                            <label htmlFor="fail">审核不通过</label>
                        </div>
                    </div>
                    <div className="auditBottom">
                        <div>
                            <a
                                href="javascript:;"
                                onClick={this.cancel}
                            >取消</a>
                            <a
                                href="javascript:;"
                                onClick={(ev) => { this.ensure(ev) }}
                            >确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(connect(state => {
    return {
        addproduct: state.addproduct,
        productlist: state.productlist,
        auditconfirm: state.auditconfirm
    }
}, dispatch => {
    return bindActionCreators(actionCreators, dispatch)
})(ExitConfirm));