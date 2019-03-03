import React, { Component } from 'react';
import '../assets/indexcss/homecss/systemHome.css';
import Refresh from '../components/productComponents/refresh';
import Statistics from './homesystemcomponents/statistics';
import PendingBusiness from './homesystemcomponents/pendingbusiness';
import QuickEntry from './homesystemcomponents/quickentry';
import ProductOverview from './homesystemcomponents/productoverview';
import OrderOverview from './homesystemcomponents/orderoverview';
import Echarts from '../echarts/echarts';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';


class HomeSystem extends Component {
    constructor() {
        super();
        this.state = {
        }
    };
    componentDidMount(){
        let { everydaydata}=this.props;
        everydaydata()
    };
    render() {
        console.log(this.props);
        let { orderlist: { thisWeekAmount, oneweekOrder}}=this.props;
        let proportion = oneweekOrder.length / thisWeekAmount;
        return (
            // 1.系统首页开始
            <div id="mainContent">
                <div className="mCTop">
                    <Refresh />
                </div>
                <div className="mCMiddle">
                    < Statistics />
                </div>
                <PendingBusiness />
                <div className="mCEntry">
                    <div>运营快捷入口</div>
                    <QuickEntry />
                </div>
                <div className="mCProductView">
                    <ProductOverview />
                    <OrderOverview />
                </div>
                <div className="mCOrder">
                    <div className="mCTitle">订单统计</div>
                    <div className="mCOrderL">
                        <ul>
                            <li>
                                <p>本周订单数量</p>
                                <p>{thisWeekAmount}</p>
                                <span>占近7天订单</span>
                                <span className="DeclineColor">{parseInt(proportion)+'%'}</span>
                            </li>
                        </ul>
                    </div>
                    <Echarts />
                </div>
                <div className="slogan">CopyRight @ logo 2015 - 2017</div>
            </div>
        )
    }
}


export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        orderlist: state.orderlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(HomeSystem));