import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../redux/actioncreators/actioncreators';

class RemoveBottom extends Component {
    constructor() {
        super();
        this.state = {
            operation: 'restore'
        }
    }
    change = (ev) => {
        this.setState({ operation: ev.target.value })

    };
    recycleensure = async () => {
        // console.log(this.state.operation)
        let { operation } = this.state;
        let { productstore, removeshow, productlist: { recycleArr }, init, getPage, setPage, gettotal, location: { pathname } } = this.props;
        let restoreArr = [];
        let deleteArr = [];
        if (operation === 'restore') {
            recycleArr.forEach((e, i) => {
                if (e.checked) {
                    restoreArr.push(e.id)
                } else {
                    console.log('请勾选需要操作的商品');
                }
            })
            if (restoreArr.length) {
                await productstore(restoreArr, false);
                await init(pathname);
                await getPage(pathname);
                await setPage();
                await gettotal(pathname);
            }

        } else if (operation === 'delete') {
            recycleArr.forEach((e, i) => {
                if (e.checked) {
                    deleteArr.push(e.id)
                } else {
                    console.log('请勾选需要操作的商品');
                }
            })
            deleteArr.length && removeshow(deleteArr, 'block')
        }
        console.log(deleteArr);
    }
    render() {
        return (
            <div className="mass">
                <select
                    className="massOperation"
                    placeholder="批量操作"
                    onChange={(ev) => { this.change(ev) }}
                >
                    <option value="restore">还原</option>
                    <option value="delete">删除</option>

                </select>
                <a
                    href="javascript:;"
                    className="confirmOperation"
                    onClick={this.recycleensure}
                >确定</a>
            </div>
        )
    }
}


export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        delconfirm: state.delconfirm
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(RemoveBottom));