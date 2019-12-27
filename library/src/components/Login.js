import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../store/actions/action';


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password);
      }
    })
  }

  checkStatus(){
    if(this.props.error){
      this.props.onLogout();
      message.error('Please enter valid username and password!',1)
    }

    if(this.props.token){
      if(this.props.isUpdated){
        this.props.getBorrowedDetail(this.props.userID);
      }
      this.props.history.push('/')
      message.success('You are logged in.')

    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (  
            <Form onSubmit={this.handleSubmit} 
            className="login-form"
            style={{width: '30vw'}}
            >
              {this.checkStatus()}
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
                </Form.Item>

                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                <Button type='primary' htmlType='submit' style={{marginRight: '10px'}}>
                Login
                </Button>
                Or
                <NavLink style={{marginRight: '10px'}} to='/signup'> Signup</NavLink>
                </Form.Item>
            </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = state => {
  return{
    error: state.books.error,
    token: state.books.token,
    userID: state.books.id,
    isUpdated: state.books.isProfileUpdated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(action.authLogin(username, password)),
    onLogout: () => dispatch(action.authLogout()),
    getBorrowedDetail: (userID) => dispatch(action.getBorrowedDetail(userID))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps) (WrappedNormalLoginForm));