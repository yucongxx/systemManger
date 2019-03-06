import React, { Component } from 'react';
import '../assets/indexcss/head.css';
import '../assets/indexcss/content.css';
import routes from '../routes/routes-child';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actioncreators/actioncreators';
import { bindActionCreators } from 'redux';
import ExitConfirm from './exitconfrim';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            // navArr: ['后台首页', '销售中心']
            menuArr1: [
                {
                    id: 1,
                    menuArr1Name: '后台首页',
                    checked: false,
                    menuArr2: [
                        {
                            id: 11,
                            menuArr2Name: '首页',
                            icon: 'icon-zhuye',
                            cTitle: '系统首页',
                            menuArr3: [
                                {
                                    id: 111,
                                    menuArr3Name: '系统首页',
                                    r1: 'homesystem'
                                },
                                {
                                    id: 112,
                                    menuArr3Name: '账户设置',
                                    r1: 'accountsetting'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    menuArr1Name: '销售中心',
                    checked: false,
                    menuArr2: [
                        {
                            id: 21,
                            menuArr2Name: '商品',
                            icon: 'icon-shangpin',
                            cTitle: '商品管理',
                            menuArr3: [
                                {
                                    id: 211,
                                    menuArr3Name: '商品列表',
                                    r1: 'productlist'
                                },
                                {
                                    id: 212,
                                    menuArr3Name: '添加商品',
                                    r1: 'addproduct'
                                },
                                {
                                    id: 213,
                                    menuArr3Name: '商品审核',
                                    r1: 'productaudit'
                                },
                                {
                                    id: 214,
                                    menuArr3Name: '商品回收站',
                                    r1: 'productrecycle'
                                }
                            ]
                        },
                        {
                            id: 22,
                            menuArr2Name: '订单',
                            icon: 'icon-dingdan',
                            cTitle: '订单管理',
                            menuArr3: [
                                {
                                    id: 221,
                                    menuArr3Name: '订单列表',
                                    r1: 'orderlist'
                                }
                            ]
                        }
                    ]
                }
            ],
            checkedId: 1,
            checkedMenuId: 11,
            contentCheckedId: 111,
            triangle: true
        }
    };
    getCookie = (key) => {
        let c = document.cookie.split('; ');
        let onOff2 = false;
        for (let i of c) {
            let arr = i.split('=');
            if (arr[0] === key) {
                onOff2 = true;
                return arr[1];
            }
            if (!onOff2) return null;
        };
    }
    contentChange = (id, $ev) => {
        if ($ev.target.nodeName === 'LI') {
            return
        };
        let { contentCheckedId } = this.state;
        console.log(this.props);
        let { changesearchonoff } = this.props;
        contentCheckedId = id;
        this.setState({ contentCheckedId }, () => {
            changesearchonoff(false);
        });

    };
    checkedChange = (id) => {
        let { checkedId, contentCheckedId, checkedMenuId, triangle } = this.state;
        checkedId = id;
        // console.log(id);
        contentCheckedId = +`${id}11`;
        checkedMenuId = +`${id}1`;
        if (id === 1) {
            this.props.history.push('/home/homesystem')
            triangle = true;
        } else if (id === 2) {
            this.props.history.push('/home/productlist')
        }
        this.setState({ checkedId, contentCheckedId, checkedMenuId, triangle });
        // console.log(this.props);
        // this.render();
    };
    leftListChange = (ev, id) => {
        let { checkedMenuId, contentCheckedId, triangle } = this.state;
        checkedMenuId = id;
        contentCheckedId = +`${id}1`;
        if (checkedMenuId === 22) {
            triangle = false;
            this.props.history.push('/home/orderlist');
        } else if (checkedMenuId === 21) {
            triangle = true;
            this.props.history.push('/home/productlist');
        }
        this.setState({ checkedMenuId, contentCheckedId, triangle });
    };
    homePage = () => {
        this.props.history.push('/home/homesystem');
        let { contentCheckedId, checkedId, checkedMenuId,triangle } = this.state;
        checkedId = 1;
        checkedMenuId = 11;
        contentCheckedId = 111;
        triangle = true;
        this.setState({ checkedId, contentCheckedId, checkedMenuId, triangle });
    };
    orderpage = () => {
        this.props.history.push('/home/orderlist');
        let { contentCheckedId, checkedId, checkedMenuId, triangle} = this.state;
        checkedId = 2;
        checkedMenuId = 22;
        contentCheckedId = 221;
        triangle = false
        this.setState({ checkedId, contentCheckedId, checkedMenuId, triangle });
    }
    componentWillMount() {
        let { location: { pathname } } = this.props;
        let user = sessionStorage.getItem('user');
        let user1 = this.getCookie('user');
        // console.log(user1);
        if (!user) {
            if (!user1) this.props.history.push('/');
        } else {
            if (pathname === '/home') {
                this.props.history.replace('/home/homesystem')
            }
        }
    };
    componentDidMount() {
        let { location: { pathname } } = this.props;
        let { contentCheckedId, checkedId, checkedMenuId, triangle } = this.state;
        switch (pathname) {
            case '/home/accountsetting':
                contentCheckedId = 112;
                this.setState({ contentCheckedId });
                break;
            case '/home/productlist':
                checkedId = 2;
                checkedMenuId = 21;
                contentCheckedId = 211;
                this.setState({ checkedId, contentCheckedId, checkedMenuId });
                break;
            case '/home/addproduct':
                checkedId = 2;
                contentCheckedId = 212
                checkedMenuId = 21;
                this.setState({ checkedId, contentCheckedId, checkedMenuId });
                break;
            case '/home/productaudit':
                checkedId = 2;
                contentCheckedId = 213
                checkedMenuId = 21;
                this.setState({ checkedId, contentCheckedId, checkedMenuId });
                break;
            case '/home/modifyproduct':
                checkedId = 2;
                checkedMenuId = 21;
                contentCheckedId = 211;
                this.setState({ checkedId, contentCheckedId, checkedMenuId });
                break;
            case '/home/productrecycle':
                checkedId = 2;
                checkedMenuId = 21;
                contentCheckedId = 214;
                this.setState({ checkedId, contentCheckedId, checkedMenuId });
                break;
            case '/home/orderlist':
                checkedId = 2;
                checkedMenuId = 22;
                contentCheckedId = 221;
                triangle = false
                this.setState({ checkedId, contentCheckedId, checkedMenuId, triangle });
                break;
            default:
        }
    };
    logout = () => {
        let { loginout } = this.props;
        let show = 'block';
        loginout(show);
    };
    render() {
        let { menuArr1, checkedId, checkedMenuId, contentCheckedId, triangle } = this.state;
        let navList = menuArr1.map((e, i) => {
            return (
                <li
                    key={i}
                    className={e.id === checkedId ? 'checkedActive' : ''}
                    onClick={() => { this.checkedChange(e.id) }}
                >
                    <a href="javascript:;" >{e.menuArr1Name}</a>
                </li>
            )
        });
        let contentLeftList = menuArr1.map((e) => {
            if (e.id === checkedId) {
                return e.menuArr2.map((e, i) => {
                    return (
                        <li key={i} onClick={(ev) => { this.leftListChange(ev, e.id) }}>
                            <a href="javascript:;">
                                <i className={`iconfont ${e.icon}`}></i>
                                <div>{e.menuArr2Name}</div>
                                <div className={triangle ? 'triangle' : 'triangleD'} ref="triange"></div>
                            </a>
                        </li>
                    )
                })
            }
        });
        let cTitle = menuArr1.map((e) => {
            if (e.id === checkedId) {
                return e.menuArr2.map((e, i) => {
                    if (e.id === checkedMenuId) {
                        return e.cTitle;
                    }
                })
            }
        });

        let contentMenu = menuArr1.map((e) => {
            if (e.id === checkedId) {
                return e.menuArr2.map(e => {
                    if (e.id === checkedMenuId) {
                        return e.menuArr3.map((e, i) => {
                            return (
                                <li
                                    className={e.id === contentCheckedId ? 'contentMActive' : ''}
                                    key={i}
                                    onClick={(ev) => { this.contentChange(e.id, ev) }}
                                >
                                    <Link to={{
                                        pathname: `/home/${e.r1}`
                                    }}>
                                        <span href="javascript:;" >● {e.menuArr3Name}</span>
                                    </Link>

                                </li>
                            )
                        })
                    }
                })

            }
        });
        return (
            <div id="wrap">
                {/* 顶部样式start */}
                <div id="header">
                    <div className="main">
                        <div className="left clearfix">后台业务管理系统</div>
                        <ul className="nav clearfix">
                            {navList}
                        </ul>
                        <div className="right clearfix">
                            <div className="admin">
                                <i className="iconfont icon-touxiang"></i>
                                <span>admin</span>
                                <div className="adDetail"></div>
                            </div>
                            <div
                                className="hPage"
                                onClick={this.homePage}
                            >
                                <i className="iconfont icon-zhuye"></i>
                            </div>
                            <div
                                className="message"
                                onClick={this.orderpage}
                            >
                                <i className="iconfont icon-xitongxiaoxi"></i>
                            </div>
                            <div
                                className="login"
                                onClick={this.logout}
                            >
                                <i className="iconfont icon-loginout"></i>
                            </div>
                        </div>

                    </div>
                </div>
                {/* 顶部样式end */}
                {/* 内容显示区左半边class start */}
                <div id="contentLeftClass">
                    {/* 后台首页 */}
                    <ul className="home">
                        {contentLeftList}
                    </ul>
                </div>
                {/* 内容显示区左半边class start */}
                {/* 内容显示区左半边menu start */}
                <div id="contentMenu">
                    {/* 系统部分 */}
                    <ul className="system">
                        <li className="cTitle">{cTitle}</li>
                        {contentMenu}
                    </ul>
                </div>
                {/* 内容显示区左半边menu end */}
                {/* 1.系统首页开始 */}
                {routes}
                {/* <HomeSystem /> */}
                {/* 1.系统首页结束 */}
                <ExitConfirm />
            </div>
        )
    }
};


export default withRouter(connect(state => state, dispatch => {
    return bindActionCreators(actionCreators, dispatch)
})(Home));