import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomSearch from '../components/Search';
import { connect } from 'react-redux';

import * as action from '../store/actions/action';


import { Layout, Menu, Breadcrumb, Icon, Button, message, notification } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class HomeLayout extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  openNotificationWithWarning = type => {
    notification[type]({
      duration: 1,
      message: 'Update profile',
      description:
        'Please update your profile information, profile details are required to issue books.',
    });
  }

  openNotificationWithSuccess = type => {
    notification[type]({
      duration: 5,
      message: 'Book borrow successful',
      description:
        'You have successfully borrowed book from TarazanSkills, please collect it from Library.',
    });
    this.props.resetBorrowState();
  }

  openNotificationWithError = type => {
      notification[type]({
        duration: 5,
        message: 'Book borrow Fail',
        description:
        'You cannot borrow book without login, please login for further transaction!'
      });
      this.props.profileError();
    }
  
  openNotificationWithBookError = type => {
    notification[type]({
      duration: 5,
      message: 'Book borrow Fail',
      description:
      'Sorry! Book which you are trying to borrow is not available at this moment, please try after sometime'
    });
    this.props.bookAvailabilityStatus();
  }

  openNotificationWithBookLimitError = type => {
    notification[type]({
      duration: 5,
      message: 'Book borrow Fail',
      description:
      'Sorry! you have exceeded the borrow limit please return borrowed books to borrow new one'
    });
    this.props.bookAvailabilityStatus();
    this.props.maxBorrowLimitStatus();
  }
   
  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        {
          !this.props.isUpdated && this.props.isAuthenticated ?
          this.openNotificationWithWarning('warning')
          :
          null
        }
        {
          this.props.borrowSuccess ? 
          this.openNotificationWithSuccess('success')
          :
          null
        }
        {
          this.props.borrowBeforeLogin && !this.props.isAuthenticated?
          this.openNotificationWithError('error')
          :
          null
        }
        {
          !this.props.isBookAvailable ?
          this.openNotificationWithBookError('error')
          :
          null

        }
        {
          this.props.isAuthenticated && this.props.borrowLimit ?
          this.openNotificationWithBookLimitError('error')
          :
          null

        }
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <NavLink to='/'>
                <Icon type="home" />
                <span>Home</span>
              </NavLink>

            </Menu.Item>
            {/* <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item> */}
            {
              this.props.isAuthenticated ?
              <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
              >
              <Menu.Item key="2">
                <NavLink to='/profile'>
                  <Icon type="profile" />Profile
                </NavLink>
              </Menu.Item>
                    
              <Menu.Item key="3">
                <NavLink to='/notification'>
                  <Icon type="notification" />
                  Notification
                </NavLink>
              </Menu.Item>
              </SubMenu>
              :
              null
            }
            
            {/* <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="4">
              <NavLink to='/video'>
                <Icon type="video-camera" />
                <span>Video</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to='/pdf'>
                <Icon type="file" />
                <span>PDF</span>
              </NavLink>
            </Menu.Item>
            {
              this.props.isAuthenticated ?

              (
                <Menu.Item key="6" onClick={() => {
                  this.props.logout(); 
                  message.warning('You are logged out!',10)
                  }
                  }>
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              )

              :
              (
                  <Menu.Item key="7">
                    <NavLink to='/login'>
                      <Icon type="login" />
                      <span>Login</span>
                    </NavLink>
                  </Menu.Item>
              )
            }
            {
              !this.props.isAuthenticated ?
              (
                <Menu.Item key="8">
                  <NavLink to='/signup'>
                    <Icon type="user-add" />
                    <span>Signup</span>
                  </NavLink>
                </Menu.Item>
              )

              :

              null
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff'}}>
              <CustomSearch />
              <NavLink to='/'>
                <img alt='nav' src={require('../assets/vectorpaint.svg')} style={{marginLeft: 200}} />
              </NavLink>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              { 
                this.props.searchValue ? 
                <Button type="danger" shape="circle" style={{marginBottom: 20}}
                onClick={() => this.props.clearSearch()}>
                  <Icon type='close'/>
                </Button>
                :
                null
              }
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Design ©2019 Created by Samarth Hegde</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    searchValue: state.books.searchValue,
    isAuthenticated: state.books.token !== null,
    token: state.books.token,
    error: state.books.error,
    isUpdated: state.books.isProfileUpdated,
    borrowSuccess: state.books.borrowDetail.status === 201,
    borrowBeforeLogin: state.books.borrowBeforeLogin,
    isBookAvailable: state.books.isBookAvailable,
    toggleState: state.books.toggleState,
    borrowLimit: state.books.numberOfBorrowedBookExceeded
  }
}

const mapDispatchToProps = dispatch => {
  return{
    clearSearch: () => dispatch(action.setSearch('')),
    logout: () => dispatch(action.authLogout()),
    resetBorrowState: () => dispatch(action.resetBorrowState()),
    profileError: () => dispatch(action.profileError(false)),
    bookAvailabilityStatus: () => dispatch(action.bookAvailabilityStatus(true)),
    maxBorrowLimitStatus: () => dispatch(action.maxBorrowLimitStatus(false, false)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);