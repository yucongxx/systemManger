import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';

class EchartsTest extends Component {
    async componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        let { orderData, everydaydata } = this.props;
        await orderData();
        await everydaydata();
        console.log(this.props);
        let dataArr = [];
        let { orderlist: { everyDayInOneWData } } = this.props;
        everyDayInOneWData.forEach(e => {
            dataArr.push(e.amountArr.length);
        })
        console.log(dataArr);
        let myChart = echarts.init(document.getElementById('ChartStatistics'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '近一周订单统计',
                textStyle: {
                    fontSize: 15,
                    "color": "#444",
                    "text-align": "center",
                    "margin-top": "20px"
                },
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['订单']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    areaStyle: { normal: {} },
                    data: dataArr
                }
            ]
        });

    }
    render() {
        return (
            <div id="ChartStatistics"></div>
        );
    }
}

export default withRouter(connect(state => {
    return {
        productlist: state.productlist,
        orderlist: state.orderlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
})(EchartsTest));