import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routers';
import { connect } from 'react-redux';

import HomeLayout from './containers/Layout';
import * as action from './store/actions/action';

class App extends Component {

  componentDidMount (){
    this.props.onTryAutoSignup();
    this.props.getBookFromServer();
  }

  render() {
    return (
        <div>
          <Router>
            <HomeLayout>
              <BaseRouter/>
            </HomeLayout>
          </Router>
          
        </div>
    );
  }
}

// const mapStateToProps = state =>{
//   return {
//       profileStatus: state.books.isProfileUpdated
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.checkStatus()),
    getBookFromServer: () => dispatch(action.getBookFromServer())
  }
}

export default connect(null, mapDispatchToProps)(App);
