import React, { Component } from 'react';
import '../assets/logincss/login.css';
import '../assets/reset.css';
import '../assets/font/iconfont.css';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            noticeIn: [],
            onOff: false
        }
    };
    userName = (ev) => {
        this.setState({ username: ev.target.value })
    };
    passWord = (ev) => {
        this.setState({ password: ev.target.value })
    };
    shake = (ele, attr, n, callback) => {
        //当登陆失败或者未输入用户名密码时登陆按钮的抖动效果
        let arr = [];
        let timer = null;
        let num = 0;
        for (let i = n; i > 0; i -= 0.5) {
            arr.push(-i, i);
        }
        arr.push(0);
        // let begin = parseFloat(getComputedStyle(ele).left);//px
        let begin = parseFloat(getComputedStyle(ele)[attr]);
        // console.log(attr);
        timer = setInterval(() => {
            // ele.style.left = begin + arr[num] + 'px';
            ele.style[attr] = begin + arr[num] + 'px';
            num++;
            if (num > arr.length) {
                clearInterval(timer);
                num = 0; //以便下次使用
                /*
                    当某个条件（事件）成立的时候，触发的函数就叫钩子函数（回调函数）
                */
                callback && callback();
                // if(callback)callback();
                // ele.style.background = 'skyblue';
            }
        }, 80);
    };
    setCookie = (key, val, obj = {}, backTime) => {
        let d = new Date(backTime);
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
        };
        document.cookie = key + '=' + val + (obj.time ? '; expires=' + d : '');
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
    login = async () => {
        let { username, password, noticeIn } = this.state;
        const login = document.querySelector('.login');
        if (username && password) {
            let data = await fetch('http://localhost:88/api/user/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username,
                    password
                }).toString()
            });
            let d = await data.json();
            console.log(d);
            if (d.code === 0) {
                console.log('登陆成功');
                let { noticeIn, onOff } = this.state;
                if (onOff) {
                    if (!this.getCookie('user')) {
                        let time = new Date(d.userInfo.time);
                        console.log(time);
                        this.setCookie('user', d.userInfo.username, { name: 'date', time: 7 }, time);
                    }
                }
                sessionStorage.setItem('user', d.userInfo.username);
                noticeIn = [];
                this.setState({ noticeIn });
                console.log(this.props);
                setTimeout(() => {
                    this.props.history.push('/home/homesystem');
                }, 500)
            } else if (d.code === -3) {
                noticeIn = ['账户名或密码错误，请重新输入'];
                this.setState({ noticeIn }, () => {
                    this.shake(login, 'top', 2)
                })
            }
        } else if (!username) {
            noticeIn = ['请填写用户账号'];
            this.setState({ noticeIn }, () => {
                this.shake(login, 'top', 2)
            })
        } else if (!password) {
            noticeIn = ['请填写登录密码']
            this.setState({ noticeIn }, () => {
                this.shake(login, 'top', 2)
            })
        }
    };
    loginContinue = () => {
        let { onOff } = this.state;
        onOff = !onOff;
        console.log(onOff);
        this.setState({ onOff });
    };
    componentWillMount() {
        console.log(this.getCookie('user'));
        if (this.getCookie('user')) {
            this.props.history.push('/home/homesystem');
        }
    };
    render() {

        let { noticeIn } = this.state;
        let noticeFrame = noticeIn.map((e, i) => {
            return <div className="notice" key={i}>
                <i className="iconfont icon-tishi-xinxi"></i>
                {e}
            </div>
        })
        return (
            <div className="loginContent">
                <div className="loginTop">
                    <i className="iconfont icon-houtai"></i>
                    <h2>后台管理系统</h2>
                </div>
                <div>
                    <div className="username">
                        <input
                            type="text"
                            className="login_username"
                            placeholder="请输入用户名"
                            onChange={this.userName}
                        />
                        <i className="iconfont icon-shanchu"></i>
                    </div>
                    <div className="password">
                        <input
                            type="password"
                            className="login_password"
                            placeholder="请输入密码"
                            onChange={this.passWord}
                        />
                        <i className="iconfont icon-shanchu"></i>
                    </div>
                    <div className="remember">
                        <label htmlFor="login-continue" className="login-continue">
                            <input
                                type="checkbox"
                                name="login-continue"
                                onClick={this.loginContinue}
                            />
                            <span>记住我的登录信息</span>
                        </label>
                    </div>
                    <a
                        href="javascript:;"
                        className="login"
                        onClick={this.login}
                    >登 录</a>
                </div>
                {noticeFrame}
            </div>
        )
    }
}


export default Login


