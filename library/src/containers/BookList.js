import React, { Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from '../store/actions/action';

import { List, Card, Button, Popover } from 'antd';


class BookList extends Component{

  componentDidMount(){
    this.props.getBookFromServer();
  }

  borrowBook = (bookID) => {
    if(this.props.isProfileUpdated && this.props.isAuthenticated){
      this.props.getBorrowedDetail(this.props.userID);
      let pendingBorrowedBook = this.props.borrowInfo.filter(item => item.is_returned === false)
      
      let bookInfo = this.props.book.filter(item => item.pk === bookID);
      let bookAvailability = bookInfo.map(item => item.available_copy)

      console.log('Number of borrowed book',pendingBorrowedBook.length)
      
      if( pendingBorrowedBook.length > 2 ){
        // console.log('borrow limit exceeded')
        if (this.props.toggleState){
          let togState=false
          this.props.maxBorrowLimitStatus(togState);

        }
        else{
          let togState=true
          this.props.maxBorrowLimitStatus(togState);
        }
        
      }
      else if(bookAvailability > 0){
        const tempDate = new Date();
        const borrowDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() 
        const returnDate = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate()+7)
        returnDate = returnDate.getFullYear() + '-' + (returnDate.getMonth()+1) + '-' + returnDate.getDate()
        console.log('return date:', returnDate)
        this.props.borrowRequest(this.props.userID, bookID, borrowDate, returnDate);
  
      }
      else{
        console.log('book availability false');
        this.props.bookNotAvailable();
      }
    }
    else {
      if (this.props.toggleState){
        let togState=false
        this.props.profileError(togState);
      }
      else{
        let togState=true
        this.props.profileError(togState);
      }
    }
  } 

    render(){
        return(
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={
                  this.props.book
                  .filter(bookValue =>{
                    return bookValue.author.toLowerCase()
                    .includes(this.props.searchValue.toLowerCase()) ||
                    bookValue.name.toLowerCase()
                    .includes(this.props.searchValue.toLowerCase()) ||
                    bookValue.short_description.toLowerCase()
                    .includes(this.props.searchValue.toLowerCase())
                  }
                  )}
                renderItem={item => (
                <List.Item>

                    <Card title={item.name}>
                      <img alt={item.name} src={item.image} width={200} height={200}/>
                      <p>By :{item.author}</p>
                      <Popover 
                      placement="bottom"
                      content={item.short_description} 
                      title={item.name} trigger="hover" 
                      overlayStyle={{
                        width: "15vw"
                      }}>
                        <Button type='primary' onClick={() => this.borrowBook(item.pk)}>
                          Borrow
                        </Button>
                      </Popover>
                    </Card>
                </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = (state) => {
  console.log('borrow Inof',state.books.borrowInfo)
  return {
    book: state.books.books,
    searchValue: state.books.searchValue,
    isProfileUpdated: state.books.isProfileUpdated,
    userID: state.books.id,
    isAuthenticated: state.books.token !== null,
    toggleState: state.books.toggleState,
    borrowInfo: state.books.borrowInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (bookDetails) => dispatch(action.getBook(bookDetails)),
    borrowRequest: (userID, bookID, borrowDate, returnDate) => dispatch(action.borrowBook(userID, bookID, borrowDate, returnDate)),
    profileError: (togState) => dispatch(action.profileError(true, togState)),
    bookNotAvailable: () => dispatch(action.bookAvailabilityStatus(false)),
    getBookFromServer: () => dispatch(action.getBookFromServer()),
    maxBorrowLimitStatus: (togState) => dispatch(action.maxBorrowLimitStatus(true, togState)),
    getBorrowedDetail: (userID) => dispatch(action.getBorrowedDetail(userID)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookList);