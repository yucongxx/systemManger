import React, { Component } from 'react';
import '../assets/indexcss/accountsetting/accountSetting.css'

class AccountSetting extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: false,
            oldPassword: {
                value: '',
                onOff: true
            },
            newPassword: '',
            confirm: {
                value: '',
                onOff: true
            }
        }
    };
    refresh = () => {
        this.forceUpdate();
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
        }
        document.cookie = key + '=' + JSON.stringify(val) + (obj.time ? '; expires=' + d : '');
    };
    rmCookie(key,val){
        this.setCookie(key, val, { name: 'date', time: -1 });
    }
    checekedEmail = (ev) => {
        let email = ev.target.value;
        let { email: email1 } = this.state;
        let re = /^[a-z1-9]\w{3,17}@[\da-z]{2,8}(\.(com|cn|net)){1,3}$/i;
        let inf = re.test(email);
        console.log(inf);
        if (!inf) {
            email1 = true;
        } else {
            email1 = false;
        }
        this.setState({ email: email1 });
    };
    checkedoldP = (ev) => {
        let oldPassword1 = ev.target.value;
        let { oldPassword } = this.state;
        oldPassword.value = oldPassword1;
        this.setState({ oldPassword });
    }
    newpass = (ev) => {
        let newPass = ev.target.value;
        let { newPassword } = this.state;
        newPassword = newPass;
        this.setState({ newPassword });
    };
    confirmpass = (ev) => {
        let confrimP = ev.target.value;
        let { confirm } = this.state;
        confirm.value = confrimP;
        this.setState({ confirm });
    };
    loginCheck = async () => {
        let { username, oldPassword } = this.state;
        let data = await fetch('http://localhost:88/api/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                username,
                password: oldPassword.value
            }).toString()
        });
        let d = await data.json();
        console.log(d);
        if (d.code === 0) {
            oldPassword.onOff = true;
            this.setState({ oldPassword });
        } else {
            oldPassword.onOff = false;
            this.setState({ oldPassword });
        }

    };
    changepwd = async () => {
        let { username, oldPassword, newPassword, confirm, email } = this.state;
        if (confirm.value === newPassword) {
            confirm.onOff = true;
        } else {
            confirm.onOff = false;
        }
        this.setState({ confirm });
        await this.loginCheck();
        console.log(oldPassword.onOff);
        if (!confirm.onOff || !confirm.value || email || !oldPassword.onOff) {
            return
        } else {
            console.log(newPassword);
            let data = await fetch('http://localhost:88/api/user/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username,
                    newPassword
                }).toString()
            });
            let d = await data.json();
            if (d.code === 0) {
                sessionStorage.removeItem('user');
                this.rmCookie('user');
                this.props.history.replace('/');
            }
        }

    }
    componentDidMount() {
        let { username } = this.state;
        let defaultUser = null;
        if (this.getCookie('user')) {
            defaultUser = this.getCookie('user');
            username = defaultUser;
        } else if(sessionStorage.getItem('user')) {
            defaultUser = sessionStorage.getItem('user');
            username = defaultUser;
        }
        this.setState({ username });
    }
    render() {
        let { username, email, oldPassword, confirm } = this.state;
        return (
            <div id="contentSetting">
                <div className="cSTop">
                    <a
                        href="javascript:;"
                        className="refresh"
                        onClick={this.refresh}
                    >
                        <i className="iconfont icon-shuaxin"></i>
                        <span>刷新</span>
                    </a>
                </div>
                <div className="settingView">
                    <div className="settingTop">账户设置</div>
                    <div className="settingMiddle">
                        <i className="iconfont icon-touxiang1"></i>
                    </div>
                    <div className="settingForm">
                        <span>用户名:</span>
                        <input
                            type="text"
                            value={username}
                            disabled
                        // className={username ? 'verFail' : ''}
                        // onBlur={this.checkedUser}
                        /><br />
                        <span>E-mail:</span>
                        <input
                            type="text"
                            className={!email ? '' : 'verFail'}
                            onBlur={this.checekedEmail}
                        /><br />
                        <span>旧密码:</span>
                        <input
                            type="password"
                            onBlur={this.checkedoldP}
                            className={oldPassword.onOff ? '' : 'verFail'}
                        /><br />
                        <span>新密码:</span>
                        <input
                            type="password"
                            onChange={this.newpass}
                            className={confirm.onOff ? '' : 'verFail'}
                        /><br />
                        <span>确认密码:</span>
                        <input
                            type="password"
                            onChange={this.confirmpass}
                            className={confirm.onOff ? '' : 'verFail'}
                        /><br />
                        <a
                            href="javascript:;"
                            onClick={this.changepwd}
                        >提交</a>
                    </div>
                </div>
                <div className="slogan">CopyRight @ logo 2015 - 2017</div>
            </div>
        )
    }
}



export default AccountSetting;