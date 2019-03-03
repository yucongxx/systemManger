import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeSystem from '../components/HomeSystem';
import AccountSetting from '../components/AccountSetting';
import ProductListview from '../components/ProductListview';
import AddProduct from '../components/addproduct';
import ProductListViewAudit from '../components/productListviewAudit';
import Productrecycle from '../components/productrecyclebin';
import Orderlist from '../components/order/orderListview'; 
 
let routers = [
    {
        path: '/home/homesystem',
        component: HomeSystem
    },
    {
        path:'/home/accountsetting',
        component:AccountSetting
    },
    {
        path:'/home/productlist',
        component: ProductListview
    },
    {
        path:'/home/addproduct',
        component:AddProduct
    },
    {
        path:'/home/productaudit',
        component: ProductListViewAudit
    },
    {
        path:'/home/modifyproduct',
        component: AddProduct
    },
    {
        path:'/home/productrecycle',
        component: Productrecycle
    },
    {
        path:'/home/orderlist',
        component: Orderlist
    }
];


function render(arr) {
    return arr.map((e, i) => {
        return (
            <Switch key={i}>
                <Route
                    exact
                    path={e.path}
                    component={e.component}
                />
            </Switch>
        )
    })
};


export default render(routers);