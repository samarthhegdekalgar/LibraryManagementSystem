import { Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../store/actions/action';

const { Search } = Input;

class CustomSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    setSearchValue = value => {
        this.props.history.push('/');
        this.props.setSearch(value);
        this.setState({
            searchValue: ''
        })
    }
    
    render(){
        return(
            <Search 
            placeholder="input search text" 
            onSearch={(value) => this.setSearchValue(value)}
            onChange={(event) => this.setState({searchValue: event.target.value})}
            value={this.state.searchValue} 
            enterButton
            style={{ width: 500, marginTop:15 }} 
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    setSearch: (value) => dispatch(action.setSearch(value))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomSearch));