import React, { Component } from 'react';
import '../assets/auditdetail/auditdetail.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';



class AuditDetail extends Component {
    timeformat = (time) => {
        let timeinit = new Date(time);
        let year = timeinit.getFullYear();
        let month = timeinit.getMonth()+1;
        let date = timeinit.getDate();
        let hour = timeinit.getHours();
        let mininutes = timeinit.getMinutes();
        let seconds = timeinit.getSeconds();
        // console.log(timeinit);
        let timestr = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${mininutes < 10 ? '0' + mininutes : mininutes}:${seconds < 10 ? '0' + seconds : seconds}`
        return timestr
    }
    cancel = () => {
        let { auditdetailcancel } = this.props;
        auditdetailcancel();
    };
    render() {
        let arr = [];
        let { auditdetail: { auditDetailData, auditState, id1 } } = this.props;
        // console.log(auditState);
        auditState.forEach(e => {
            if (id1 === e.id) {
                arr.push(e)
            }
        })
        let auditDetailList = arr.map((e, i) => {
            let time = null;
            let user = sessionStorage.getItem('user');
            if (e.auditTime) {
                time = this.timeformat(+e.auditTime);
            } else {
                time = '无';
                user = '无'
            }
            return (
                <tr key={i}>
                    <td>
                        <span>{time}</span>
                    </td>
                    <td>
                        <span>{user}</span>
                    </td>
                    <td>
                        <span>{e.pPut ? '审核通过' : '未通过'}</span>
                    </td>
                </tr>
            )
        })
        return (
            <div style={auditDetailData}>
                <div className="admask">
                </div>
                <div className="auditDetail">
                    <div className="aDetailTop clearfix">
                        审核详情
                         <i
                            className="iconfont icon-guanbi"
                            onClick={this.cancel}
                        ></i>
                    </div>
                    <div className="aDetailContent">
                        <table className="aDetailTable">
                            <thead>
                                <tr>
                                    <th>审核时间</th>
                                    <th>审核人员</th>
                                    <th>审核结果</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditDetailList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        auditdetail: state.auditdetail,
        auditconfirm: state.auditconfirm
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(AuditDetail);