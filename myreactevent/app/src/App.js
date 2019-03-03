import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import routes from './routes/routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './redux/actioncreators/actioncreators';

class App extends Component{
    render(){
        return(
            <div className="app">
               {routes}
            </div>
        )
    }
}


export default withRouter((connect(state => {
    return {
        loginoutS:state.loginoutS,
        addproduct: state.addproduct,
        productlist: state.productlist
    }
}, (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}))(App));