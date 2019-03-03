import React, { Component } from 'react';
import '../assets/indexcss/addproduct/addProduct.css';
import '../assets/indexcss/addproduct/checkOnoff.css';
import { connect } from 'react-redux';
import * as actioncreators from '../redux/actioncreators/actioncreators';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom';

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {

        }
    };
    addinfo = async (ele, ev) => {
        let { addvalue, location: { pathname }} = this.props;
        if (ele.type === 'checkbox') {
            await addvalue(ele.id, ele.type, ev.target.checked, pathname);
        } else {
            await addvalue(ele.id, ele.type, ev.target.value, pathname);
        }
        let { addproduct: { informationArr } } = this.props;
        this.arr = informationArr;
    };
    addPro = () => {
        let { addgoods,location:{pathname}} = this.props;
        if (pathname ==='/home/addproduct'){
            console.log(1)
            let arrTest = this.arr && this.arr.filter(e => e.type !== 'checkbox')
            let test = arrTest && arrTest.every(e => e.value);
            if (test) {
                addgoods();
                // this.props.history.push('/home/productlist');
                // this.forceUpdate();
            }
        } else if (pathname ==='/home/modifyproduct'){
            console.log(2);
            let { submiteditinfo}=this.props;
            submiteditinfo();
        }
      
    };
    render() {
        // console.log(this.props);
        let { addproduct: { informationArr } } = this.props;
        let addList = informationArr.map((e, i) => {
            switch (e.type) {
                case 'text':
                    return (
                        <div key={i}>
                            <label>{e.name}:</label>
                            <input
                                type="text"
                                onChange={(ev) => { this.addinfo(e, ev) }}
                            />
                        </div>
                    )
                case 'textarea':
                    return (
                        <div key={i}>
                            <span>{e.name}:</span>
                            <textarea
                                placeholder="请输入内容"
                                onChange={(ev) => { this.addinfo(e, ev) }}
                            ></textarea>
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={i}>
                            <span className="productPut">{e.name}:</span>
                            <input
                                type="checkbox"
                                className="checke"
                                onClick={(ev) => { this.addinfo(e, ev) }}
                            />
                        </div>
                    )
                default:
                    break;
            }
        });
        return (
            <div id="addProduct">
                <div className="aPList">
                    <div className="aPListL2">
                        <div className="aPClassify">
                            <i className="iconfont icon-biaoqian-"></i>
                            <span>基本信息</span>
                        </div>
                        <div className="aPClassify">
                            <i className="iconfont icon-biaoqian-"></i>
                            <span>库存规格</span>
                        </div>
                        <div className="aPClassify">
                            <i className="iconfont icon-biaoqian-"></i>
                            <span>其他信息</span>
                        </div>
                    </div>
                    <div className="aPListContentStep2">
                        <div className="square"></div>
                        <div className="triangleClassify"></div>
                        <div className="square1"></div>
                        <div className="triangleClassify1"></div>
                        <div className="square2"></div>
                        <div className="triangleClassify2"></div>
                        <div className="addInformation">
                            {addList}
                        </div>
                    </div>
                    <div className="aPListBottom2">
                        <a
                            href="javascript:;"
                            className="submitInfo"
                            onClick={this.addPro}
                        >完成，提交商品</a>
                    </div>
                </div>
                <div className="slogan">CopyRight @ logo 2015 - 2017</div>
            </div>
        )
    }
}


export default connect(state => {
    return {
        loginout: state.loginout,
        addproduct: state.addproduct
    }
}, (dispatch) => {
    return bindActionCreators(actioncreators, dispatch)
})(AddProduct);