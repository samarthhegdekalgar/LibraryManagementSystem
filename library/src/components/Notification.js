import React, { Component } from 'react';

import { Descriptions, Badge, Icon, Empty } from 'antd';
import { connect } from 'react-redux';
import * as action from '../store/actions/action';

class Notification extends Component{


  componentDidMount(){
    if(this.props.isUpdated){
      this.props.getData(this.props.userID);
    }
  }

  getBookName = (bookID) => {
    const bookInfo = this.props.book.filter(item => item.pk === bookID);
    return bookInfo.map(item =>item.name)
  }

render(){
    return(
      <div>
        {
          (this.props.isAuthenticated && this.props.isUpdated) ?
            this.props.borrowDetail.reverse().map((item, index)=>
            <Descriptions title='' bordered key={index} style={{marginTop:20, width: '50vw'}}>
              <Descriptions.Item label="Book Name" span={3}>
              {this.getBookName(item.book)}
              </Descriptions.Item>
              <Descriptions.Item label="Borrowed Date" span={3}>{item.borrow_date}</Descriptions.Item>
              <Descriptions.Item label="Return Date" span={3}>{item.return_date}</Descriptions.Item>
              <Descriptions.Item label="Status" span={3}>
                {
                  item.is_returned ? 
                  <div>
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>                    
                    <span> Returned</span>
                  </div>
                  :
                  <div>
                    <Icon type="clock-circle" style={{ color: '#f5222d' }}/>
                    <span> Pending</span>
                  </div>
                }
              </Descriptions.Item>
            </Descriptions>
          )
          :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }  
        <br/>
        <br/>
      </div>
      );
    }
}

const mapStateToProps = state => {
  console.log('Book info from server',state.books.books);
  return {
    isAuthenticated: state.books.token !== null,
    isUpdated: state.books.isProfileUpdated,
    borrowDetail: state.books.borrowInfo,
    book: state.books.books,
    userID: state.books.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: (userID) => dispatch(action.getBorrowedDetail(userID))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Notification);