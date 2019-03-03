"use strict";
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Product = require('../models/product');
let Order = require('../models/order');
let multiparty = require('multiparty');
let fs = require('fs');
let resData;

router.use(function (req, res, next) {
    resData = {
        code: 0,
        msg: ''
    };
    next();
});

router.post('/user/login', (req, res, next) => {
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;
    console.log(username)
    if (username == '' || password == '') {
        resData.code = -1;
        resData.msg = '用户名或密码不能为空';
        res.json(resData);
        return;
    }
    User.findOne({
        username: username,
        password: password
    }).then((userInfo) => {
        if (!userInfo) {
            resData.code = -3;
            resData.msg = '用户不存在或密码错误'
            res.json(resData);
            return;
        }
        resData.msg = '登录成功';
        resData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username,
            time: +new Date()
        };
        res.json(resData);
    })
});

router.post('/user/verifyuser', (req, res, next) => {
    let username = req.body.username;

    if (username == '') {
        resData.code = -1;
        resData.msg = '用户名不能为空';
        res.json(resData);
        return
    }
    User.findOne({
        username: username
    }).then((userInfo) => {
        if (!userInfo) {
            resData.code = -3;
            resData.msg = '用户不存在'
            res.json(resData);
            return;
        }
        resData.msg = '验证成功';
        resData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username,
            time: userInfo.time
        };
        res.json(resData);
    })
});




router.post('/user/register', (req, res, next) => {
    console.log('进来');
    let username = req.body.username;
    let password = req.body.password;

    if (username == '') {
        resData.code = -1;
        resData.msg = '用户名不能为空';
        res.json(resData);
        return;
    }
    if (password == '') {
        resData.code = -2;
        resData.msg = '密码不能为空';
        res.json(resData);
        return;
    }
    // let user = new User({
    //   username: username,
    //   password: password
    // });
    // user.save().then(function (newUserInfo) {

    console.log(username, '这个就是前端传的name')
    User.findOne({
        username: username
    }).then(function (newUserInfo) {
        console.log(newUserInfo + 'OK');
        if (!newUserInfo) {
            let time = +new Date();
            let user = new User({
                username: username,
                password: password,
                time: time
            });
            user.save().then(() => {
                resData.code = 0;
                resData.msg = '注册成功！';
                resData.time = time;
                console.log(resData);
                res.json(resData);
            });
        } else {
            resData.code = 1;
            resData.msg = '用户名已占用!';
            res.json(resData);
        }
    });
});

router.post('/user/update', (req, res, next) => {
    let username = req.body.username;
    let npassword = req.body.newPassword;
    npassword.toString();
    console.log(npassword);
    if (username == '') {
        resData.code = -1;
        resData.msg = '用户名不能为空';
        res.json(resData);
        return;
    }
    if (npassword == '') {
        resData.code = -2;
        resData.msg = '密码不能为空';
        res.json(resData);
        return;
    }
    User.findOne({
        username: username
    }).then(function (newUserInfo) {
        if (newUserInfo) {
            User.update({ username }, { password: npassword }).then(() => {
                resData.code = 0;
                resData.msg = '修改成功！';
                console.log(resData);
                res.json(resData);
            });
        } else {
            resData.code = 1;
            resData.msg = '修改失败！';
            res.json(resData);
        }
    })
})

//product
router.get('/product', (req, res, next) => {
    let act = req.query.act;
    let id,
        pName,
        subtitle,
        pBrand,
        pIntroduction,
        pId,
        pPrice,
        pInventory,
        pIntegral,
        pRemark,
        newPro,
        pPut,
        recycle;
    let arr = [];
    let obj = {};
    const PAGE_SIZE = 6;
    switch (act) {
        case 'add':
            pName = req.query.pName;
            subtitle = req.query.subtitle;
            pBrand = req.query.pBrand.trim();
            pIntroduction = req.query.pIntroduction;
            pId = req.query.pId.trim();
            pPrice = req.query.pPrice;
            pInventory = req.query.pInventory;
            pIntegral = req.query.pIntegral;
            pRemark = req.query.pRemark;
            newPro = req.query.newPro;
            arr.push(pName, subtitle, pBrand, pIntroduction, pId, pPrice, pInventory, pIntegral);
            let checked = arr.every(e => e)
            if (!checked) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                let time = +new Date();
                let audit = false;
                let checked = false;
                let pPut = false;
                let recycle = false
                arr.forEach(e => {
                    e.replace('\n', '');
                })
                let product = new Product({
                    pName: pName,
                    subtitle: subtitle,
                    pBrand: pBrand,
                    pIntroduction: pIntroduction,
                    pId: pId,
                    pPrice: pPrice,
                    pInventory: pInventory,
                    pIntegral: pIntegral,
                    pPut: pPut,
                    pRemark: pRemark,
                    time: time,
                    audit: audit,
                    checked: checked,
                    newPro: newPro,
                    recycle: recycle
                });
                product.save((err, newProductInfo) => {
                    resData.code = 0;
                    resData.msg = '提交成功';
                    resData.id = newProductInfo.id;
                    resData.time = newProductInfo.time;
                    res.json(resData);
                });
            }
            break;
        case 'get_page_count':
            Product.find({ recycle: false }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'get_auditpage_count':
            Product.find({ audit: false }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'get_recyclepage_count':
            Product.find({ recycle: true }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'get':
            let page = Number(req.query.page);
            if (!page) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                Product
                    .find({ recycle: false })
                    .sort('-time')
                    .skip(PAGE_SIZE * (page - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr.push(obj);
                        }
                        res.json(arr);
                    })
            }
            break;

        case 'getaudit':
            let apage = Number(req.query.page);
            if (!apage) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                Product
                    .find({ audit: false })
                    .sort('-time')
                    .skip(PAGE_SIZE * (apage - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr1 = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr1.push(obj);
                        }
                        res.json(arr1);
                    })
            }
            break;
        case 'getrecycle':
            let rpage = Number(req.query.page);
            if (!rpage) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                Product
                    .find({ recycle: true })
                    .sort('-time')
                    .skip(PAGE_SIZE * (rpage - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr2 = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr2.push(obj);
                        }
                        res.json(arr2);
                    })
            }
            break;
        case 'audit':
            id = req.query.id;
            pPut = req.query.pPut;
            if (pPut === 'fail') {
                pPut = false;
            } else if (pPut === 'pass') {
                pPut = true
            } else {
                pPut = false;
            }
            Product.find({ _id: id }, (err, data) => {
                if (err) console.log(err);
                data.forEach(e => {
                    e.audit = true;
                    e.pPut = pPut;
                    e.auditTime = +new Date();
                    e.save((err) => {
                        if (!err) {
                            resData.code = 0;
                            resData.msg = '审核成功';
                            resData.auditinfo = {
                                info: e
                            }
                            res.json(resData);
                        } else {
                            resData.code = -1;
                            resData.msg = '审核失败';
                            res.json(resData);
                        }
                    })
                })
            });
            break;
        case 'edit':
            id = req.query.id;
            Product.find({ _id: id }, (err, data) => {
                if (err) console.log(err);
                data.forEach(e => {
                    pName = req.query.pName;
                    subtitle = req.query.subtitle;
                    pBrand = req.query.pBrand;
                    pIntroduction = req.query.pIntroduction;
                    pId = req.query.pId;
                    pPrice = req.query.pPrice;
                    pInventory = req.query.pInventory;
                    pIntegral = req.query.pIntegral;
                    pRemark = req.query.pRemark;
                    newPro = req.query.newPro;
                    obj.pName = pName;
                    obj.subtitle = subtitle;
                    obj.pBrand = pBrand;
                    obj.pIntroduction = pIntroduction;
                    obj.pId = pId;
                    obj.pPrice = pPrice;
                    obj.pInventory = pInventory;
                    obj.pIntegral = pIntegral;
                    obj.pRemark = pRemark;
                    obj.newPro = newPro;
                    obj.audit = false;
                    obj.checked = false;
                    obj.pPut = false;
                    for (let attr in obj) {
                        if (obj[attr] || typeof obj[attr] === 'boolean') {
                            e[attr] = obj[attr]
                        }
                    };
                    e.save((err) => {
                        if (!err) {
                            resData.code = 0;
                            resData.msg = '修改成功';
                            res.json(resData);
                        } else {
                            resData.code = -1;
                            resData.msg = '修改失败';
                            res.json(resData);
                        }
                    })
                })
            })
            break;
        case 'recycle':
            id = req.query.id;
            recycle = req.query.recycle
            Product.find({ _id: id }, (err, data) => {
                if (err) console.log(err);
                data.forEach(e => {
                    e.recycle = recycle;
                    e.save((err) => {
                        if (!err) {
                            resData.code = 0;
                            resData.msg = '成功放入回收站';
                            resData.auditinfo = {
                                info: e
                            }
                            res.json(resData);
                        } else {
                            resData.code = -1;
                            resData.msg = '放入回收站失败失败';
                            res.json(resData);
                        }
                    })
                })
            });
            break;
        case 'del':
            id = req.query.id;
            Product.remove({ _id: id }, (err) => {
                if (!err) {
                    resData.code = 0;
                    resData.msg = '删除成功';
                    res.json(resData);
                } else {
                    resData.code = 0;
                    res.json.msg = '删除成功';
                    res.json(resData);
                }
            })
            break;
        case 'getdata':
            Product.find({}).exec((err, data) => {
                let arr = [];
                for (let o of data) {
                    let obj = {
                        id: o._id,
                        pName: o.pName,
                        subtitle: o.subtitle,
                        pBrand: o.pBrand,
                        pIntroduction: o.pIntroduction,
                        pId: o.pId,
                        pPrice: o.pPrice,
                        pInventory: o.pInventory,
                        pIntegral: o.pIntegral,
                        pPut: o.pPut,
                        pRemark: o.pRemark,
                        time: o.time,
                        audit: o.audit,
                        checked: o.checked,
                        auditTime: o.auditTime,
                        recycle: o.recycle
                    };
                    arr.push(obj)
                }
                res.json(arr);
            })
            break;
        case 'search':
            let spage = Number(req.query.page);
            if (!spage) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                pId = req.query.pId.trim();
                pBrand = req.query.pBrand.trim();
                Product
                    .find({ pId, pBrand, recycle: false })
                    .sort('-time')
                    .skip(PAGE_SIZE * (spage - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr.push(obj);
                        }
                        res.json(arr);
                    });
            }
            break;
        case 'searchaudit':
            let sapage = Number(req.query.page);
            if (!sapage) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                pId = req.query.pId.trim();
                pBrand = req.query.pBrand.trim();
                Product
                    .find({ pId, pBrand, audit: false })
                    .sort('-time')
                    .skip(PAGE_SIZE * (sapage - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr.push(obj);
                        }
                        res.json(arr);
                    });
            }
            break;
        case 'searchrecycle':
            let srpage = Number(req.query.page);
            if (!srpage) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                pId = req.query.pId.trim();
                pBrand = req.query.pBrand.trim();
                Product
                    .find({ pId, pBrand, recycle: true })
                    .sort('-time')
                    .skip(PAGE_SIZE * (srpage - 1))
                    .limit(PAGE_SIZE)
                    .exec((err, data) => {
                        let arr = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                pName: o.pName,
                                subtitle: o.subtitle,
                                pBrand: o.pBrand,
                                pIntroduction: o.pIntroduction,
                                pId: o.pId,
                                pPrice: o.pPrice,
                                pInventory: o.pInventory,
                                pIntegral: o.pIntegral,
                                pPut: o.pPut,
                                pRemark: o.pRemark,
                                time: o.time,
                                audit: o.audit,
                                checked: o.checked,
                                auditTime: o.auditTime,
                                recycle: o.recycle
                            };
                            arr.push(obj);
                        }
                        res.json(arr);
                    });
            }
            break;
        case 'get_page_scount':
            pId = req.query.pId.trim();
            pBrand = req.query.pBrand.trim();
            Product.find({ pId, pBrand, recycle: false }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'get_auditpage_scount':
            pId = req.query.pId.trim();
            pBrand = req.query.pBrand.trim();
            Product.find({ pId, pBrand, audit: false }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'get_recyclepage_scount':
            pId = req.query.pId.trim();
            pBrand = req.query.pBrand.trim();
            Product.find({ pId, pBrand, recycle: true }).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / PAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'getpPut':
            Product
                .find({ pPut: true })
                .sort('-time')
                .exec((err, data) => {
                    let arr = [];
                    for (let o of data) {
                        let obj = {
                            id: o._id,
                            pName: o.pName,
                            subtitle: o.subtitle,
                            pBrand: o.pBrand,
                            pIntroduction: o.pIntroduction,
                            pId: o.pId,
                            pPrice: o.pPrice,
                            pInventory: o.pInventory,
                            pIntegral: o.pIntegral,
                            pPut: o.pPut,
                            pRemark: o.pRemark,
                            time: o.time,
                            audit: o.audit,
                            checked: o.checked,
                            auditTime: o.auditTime,
                            recycle: o.recycle
                        };
                        arr.push(obj);
                    }
                    res.json(arr);
                })
            break;
        case 'productget':
            Product
                .find({})
                .sort('-time')
                .exec((err, data) => {
                    if (err) console.log(err);
                    let arr = [];
                    for (let o of data) {
                        let obj = {
                            id: o._id,
                            pName: o.pName,
                            subtitle: o.subtitle,
                            pBrand: o.pBrand,
                            pIntroduction: o.pIntroduction,
                            pId: o.pId,
                            pPrice: o.pPrice,
                            pInventory: o.pInventory,
                            pIntegral: o.pIntegral,
                            pPut: o.pPut,
                            pRemark: o.pRemark,
                            time: o.time,
                            audit: o.audit,
                            checked: o.checked,
                            auditTime: o.auditTime,
                            recycle: o.recycle,
                            newPro: o.newPro,
                        };
                        arr.push(obj);
                    }
                    res.json(arr);
                })
            break;
        case 'getauditf':
            Product
                .find({ audit: false })
                .sort('-time')
                .exec((err, data) => {
                    if (err) console.log(err);
                    let arr = [];
                    for (let o of data) {
                        let obj = {
                            id: o._id,
                            pName: o.pName,
                            subtitle: o.subtitle,
                            pBrand: o.pBrand,
                            pIntroduction: o.pIntroduction,
                            pId: o.pId,
                            pPrice: o.pPrice,
                            pInventory: o.pInventory,
                            pIntegral: o.pIntegral,
                            pPut: o.pPut,
                            pRemark: o.pRemark,
                            time: o.time,
                            audit: o.audit,
                            checked: o.checked,
                            auditTime: o.auditTime,
                            recycle: o.recycle
                        };
                        arr.push(obj);
                    }
                    res.json(arr);
                })
            break;
        case 'getprecyclef':
            Product
                .find({ recycle: false })
                .sort('-time')
                .exec((err, data) => {
                    if (err) console.log(err);
                    let arr = [];
                    for (let o of data) {
                        let obj = {
                            id: o._id,
                            pName: o.pName,
                            subtitle: o.subtitle,
                            pBrand: o.pBrand,
                            pIntroduction: o.pIntroduction,
                            pId: o.pId,
                            pPrice: o.pPrice,
                            pInventory: o.pInventory,
                            pIntegral: o.pIntegral,
                            pPut: o.pPut,
                            pRemark: o.pRemark,
                            time: o.time,
                            audit: o.audit,
                            checked: o.checked,
                            auditTime: o.auditTime,
                            recycle: o.recycle
                        };
                        arr.push(obj);
                    }
                    res.json(arr);
                })
            break;
        default:
            resData.code = -1;
            resData.msg = '参数错误';
            res.json(resData);
    }
})

//order

router.get('/order', (req, res, next) => {
    let act = req.query.act;
    let oPrice,
        oMount,
        oAccount,
        oPayMethod,
        oOrderStatus,
        id;
    const OPAGE_SIZE = 6;
    let arr = [];
    let obj = {};
    switch (act) {
        case 'add':
            oPrice = req.query.oPrice;
            oMount = req.query.oMount;
            oAccount = req.query.oAccount;
            oPayMethod = req.query.oPayMethod;
            arr.push(oPrice, oMount, oAccount, oPayMethod);
            let checked = arr.every(e => e);
            if (!checked) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                let time = +new Date();
                let checked = false;
                let oNumber = parseInt(+new Date() + Math.random() * 1000);
                if (oPayMethod == 0) {
                    oOrderStatus = 0
                } else {
                    oOrderStatus = 1
                }
                arr.forEach(e => {
                    e.replace('\n', '');
                })
                let order = new Order({
                    oPrice: oPrice,
                    oMount: oMount,
                    oNumber: oNumber,
                    oAccount: oAccount,
                    oOrderStatus: oOrderStatus,
                    oPayMethod: oPayMethod,
                    time: time,
                    checked: checked,
                });
                order.save((err, newOrderInfo) => {
                    resData.code = 0;
                    resData.msg = '提交成功';
                    resData.id = newOrderInfo.id;
                    resData.time = newOrderInfo.time;
                    res.json(resData);
                });
            }
            break;
        case 'get':
            let page = Number(req.query.page);
            if (!page) {
                resData.code = -1;
                resData.msg = '参数错误';
                res.json(resData);
            } else {
                Order
                    .find({})
                    .sort('-time')
                    .skip(OPAGE_SIZE * (page - 1))
                    .limit(OPAGE_SIZE)
                    .exec((err, data) => {
                        let arr = [];
                        for (let o of data) {
                            let obj = {
                                id: o._id,
                                oPrice: o.oPrice,
                                oMount: o.oMount,
                                oNumber: o.oNumber,
                                oAccount: o.oAccount,
                                oPayMethod: o.oPayMethod,
                                time: o.time,
                                checked: o.checked,
                                oOrderStatus: o.oOrderStatus
                            };
                            arr.push(obj);
                        }
                        res.json(arr);
                    })
            }
            break;
        case 'changestatus':
            id = req.query.id;
            Order.find({ _id: id }, (err, data) => {
                if (err) console.log(err);
                data.forEach(e => {
                    oPrice = req.query.oPrice;
                    oMount = req.query.oMount;
                    oAccount = req.query.oAccount;
                    oOrderStatus = req.query.oOrderStatus;
                    obj.oPrice = oPrice;
                    obj.oMount = oMount;
                    obj.oAccount = oAccount;
                    obj.oPayMethod = oPayMethod;
                    obj.oOrderStatus = oOrderStatus;
                    obj.checked = false;
                    for (let attr in obj) {
                        if (obj[attr] || typeof obj[attr] === 'boolean') {
                            e[attr] = obj[attr]
                        }
                    };
                    e.save((err) => {
                        if (!err) {
                            resData.code = 0;
                            resData.msg = '修改成功';
                            res.json(resData);
                        } else {
                            resData.code = -1;
                            resData.msg = '修改失败';
                            res.json(resData);
                        }
                    })
                })
            })
            break;
        case 'get_page_count':
            Order.find({}).count({}, (err, n) => {
                resData.code = 0;
                resData.msg = '页数获取成功！当前设置为' + OPAGE_SIZE + '条数据一分页';
                resData.count = Math.ceil(n / OPAGE_SIZE);
                res.json(resData);
            });
            break;
        case 'getdata':
            Order
                .find({})
                .sort('-time')
                .exec((err, data) => {
                    if (err) console.log(err);
                    let arr = [];
                    for (let o of data) {
                        let obj = {
                            id: o._id,
                            oPrice: o.oPrice,
                            oMount: o.oMount,
                            oNumber: o.oNumber,
                            oAccount: o.oAccount,
                            oPayMethod: o.oPayMethod,
                            time: o.time,
                            checked: o.checked,
                            oOrderStatus: o.oOrderStatus
                        };
                        arr.push(obj);
                    }
                    res.json(arr);
                })
            break;
        case 'del':
            id = req.query.id;
            Order.remove({ _id: id }, (err) => {
                if (!err) {
                    resData.code = 0;
                    resData.msg = '删除成功';
                    res.json(resData);
                } else {
                    resData.code = 0;
                    res.json.msg = '删除成功';
                    res.json(resData);
                }
            })
            break;
        default:
            resData.code = -1;
            resData.msg = '参数错误';
            res.json(resData);
    }
})

module.exports = router;