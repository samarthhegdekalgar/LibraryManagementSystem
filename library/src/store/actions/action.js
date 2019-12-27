import axios from 'axios';

import * as actionType from './actionType';

export const getBook = (items) => {
    return{
        type: actionType.GET_DATA,
        payload: items
    }
}

export const getBookFromServer = () =>{
    return dispatch => {
    axios.get('http://127.0.0.1:8000/book/list/')
    .then(res =>{
      dispatch(getBook(res.data));
    })
    .catch(err => {
      console.log(err);
    })
    }
}

export const setSearch = (searchItem) => {
    return{
        type: actionType.SEARCH_DATA,
        payload: searchItem
    }
}

export const authStart = () => {
    return{
        type: actionType.AUTH_START,
        payload: 
        {
            loading: true
        }
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionType.AUTH_SUCCESS,
        payload:
        {
            token: token,
            id: id,
            loading: false,
            error: null,
            isUpdated: true
        }
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        payload: 
        {
            loading: false,
            error: error
        }
    }
}

export const updateProfile = (token) => {
    return {
        type: actionType.SET_PROFILE_STATUS,
        payload:
        {
            token: token,
            isUpdated: false,
            loading: false,
            error: null,
            name: '',
            mobileNumber: '',
            email: '',
            displayPicURL: ''

        }
    }
}

export const setProfile = (name, mobileNumber, email, displayPicURL) => {
    return {
        type:actionType.SET_DATA,
        payload: {
            name: name, 
            mobileNumber: mobileNumber,
            email: email,
            displayPicURL: displayPicURL
        }
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key
            localStorage.setItem('token', token)
            axios.post('http://127.0.0.1:8000/user/id/',{
                username: username,
                password: password
            })
            .then(res=>{
                console.log('userID from server', res.data.id, res);
                const id = res.data.id
                localStorage.setItem('id', id)
                dispatch(authSuccess(token, id));
                axios.get('http://127.0.0.1:8000/user/'+id.toString()+'/')
                .then(res =>{
                    console.log('getting data')
                    console.log(res);
                    const name = res.data.name
                    const mobileNumber = res.data.mobile_number
                    const displayPicURL = res.data.display_pic
                    const email = res.data.email
                    dispatch(setProfile(name, mobileNumber, email, displayPicURL))
                })
                .catch(err=>{
                    dispatch(updateProfile(token))
                    console.log(err);
                })
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}



export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username: username,
            email: email,
            password1: password1,
            password2: password2

        })
        .then(res => {
            const token = res.data.key
            localStorage.setItem('token', token)
            axios.post('http://127.0.0.1:8000/user/id/',{
                username: username,
                password: password1
            })
            .then(res=>{
                dispatch(authSuccess(token, res.data.id));
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authLogout = () => {
    localStorage.removeItem('user');
    localStorage.clear()
    return{
        type: actionType.AUTH_LOGOUT,
        payload: 
        {
            token: null,
            loading: false,
            error: null,
            isUpdated: false,
            id: null,
            name: '',
            mobileNumber: '',
            email: '',
            displayPicURL: '',
            borrowDetail: [],
            borrowError: [],
            borrowInfo: [],
            borrowBook: [],

        }

    }
}

export const checkStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if ( token === undefined || id === undefined || id === null || token === null){
            dispatch(authLogout())
        }
        else {
            dispatch(authSuccess(token,id))
            axios.get('http://127.0.0.1:8000/user/'+id.toString()+'/')
            .then(res =>{
                console.log('getting data')
                console.log(res);
                const name = res.data.name
                const mobileNumber = res.data.mobile_number
                const displayPicURL = res.data.display_pic
                const email = res.data.email
                dispatch(setProfile(name, mobileNumber, email, displayPicURL))
            })
            .catch(err=>{
                dispatch(updateProfile(token))
                console.log(err);
            })
        }
    }
}

export const borrowSuccess = (data) => {
    return{
        type: actionType.BORROW_SUCCESS,
        payload: data
    }
}

export const borrowFail = (err) => {
    return{
        type: actionType.BORROW_FAIL,
        payload: err
    }

}

export const resetBorrowState = () =>{
    return{
        type: actionType.BORROW_RESET,
        payload: []
    }
}

export const profileError = (status, togState) => {
    return {
        type: actionType.PROFILE_ERROR,
        payload: {
            borrowBeforeLogin: status,
            isProfileUpdated: false,
            togState: togState
        }
    }
}

export const borrowBook = (userID, bookID, borrowDate, returnDate) => {
    return dispatch => {
        // if(userID === null || bookID === null){
        //     dispatch(profileError())
        // }
        // else {
        axios.post('http://127.0.0.1:8000/borrow/create/', {
            user: userID,
            book: bookID,
            borrow_date: borrowDate,
            return_date: returnDate
            })
        .then(res => {
            console.log('Borrow response:',res);
            dispatch(borrowSuccess(res));
            dispatch(getBookFromServer());
        })
        .catch(err =>{
            console.log('Borrow error',err);
            dispatch(borrowFail(err))
        })
    }
    
}

export const setNotification = (borrowRes) => {
    return{
        type: actionType.BORROW_DETAIL,
        payload: {
            borrowInfo: borrowRes
        }
    }
}

export const bookAvailabilityStatus = (status) =>{
    return {
        type: actionType.BOOK_AVAILABILITY,
        payload: {
            isBookAvailable: status
        }
    }
}

export const maxBorrowLimitStatus = (borrowLimitStatus, togState) => {
    return {
        type: actionType.MAX_BORROW_LIMIT,
        payload: {
            numberOfBorrowedBookExceeded: borrowLimitStatus,
            toggleState: togState

        }
    }
}

export const getBorrowedDetail = userID => {
    return dispatch => {
        axios.get('http://localhost:8000/borrow/detail/'+userID.toString()+'/')
        .then(borrowRes =>{
            console.log('borrowINFO:', borrowRes.data)
            dispatch(setNotification(borrowRes.data));
        })
        .catch(err =>{
            console.log('Borrow detail error from user:',err);
        })
    }
}

export const profileUpdate = (form_data) => {
return dispatch => {
    axios.post('http://localhost:8000/user/create/', form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
    .then(res =>{
        console.log('profile updated Successfully')
        dispatch(authLogout())

    })
    .catch(err =>{
        console.log('Error in profile update process')
    })
}    
}