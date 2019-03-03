import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginoutS from './reducer/loginout';
import addproduct from './reducer/addprodcut';
import productlist from './reducer/prodcutlist';
import auditconfirm from './reducer/auditconfirm';
import auditdetail from './reducer/auditdetail';
import delconfirm from './reducer/delconfirm';
import proSearch from './reducer/search';
import orderlist from './reducer/orderlist';

const store = createStore(combineReducers({
    loginoutS,
    addproduct,
    productlist,
    auditconfirm,
    auditdetail,
    delconfirm,
    proSearch,
    orderlist
}), applyMiddleware(thunk));

export { store };