import * as actionType from '../actions/actionType';
import { combineReducers } from "redux";
import { borrowBook } from '../actions/action';

const initialState = {
    books: [],
    searchValue: '',
    loading: false,
    token: null,
    error: null,
    id: null,
    isProfileUpdated: false,
    name: null,
    mobileNumber: null,
    email: null,
    displayPicURL: null,
    borrowDetail: [],
    borrowError: [],
    borrowInfo: [],
    borrowBook: [],
    borrowBeforeLogin: false,
    isBookAvailable: true,
    toggleState: false,
    // numberOfBorrowedBookExceeded: false
};

const booksReducer = (state=initialState, action) => {
    switch(action.type){
        case actionType.GET_DATA : 
            return {...state, books: action.payload}
        
        case actionType.SEARCH_DATA:
            return {...state, searchValue: action.payload}
            
        case actionType.AUTH_START:
            return {...state, loading: action.payload.loading}

        case actionType.AUTH_SUCCESS:
            return {
                ...state, 
                token: action.payload.token,
                error: action.payload.error,
                loading: action.payload.loading,
                id: action.payload.id,
                isProfileUpdated: action.payload.isUpdated
            }

        case actionType.AUTH_FAIL:
            return {
                ...state, 
                loading: action.payload.loading,
                error: action.payload.error
            }

        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: action.payload.token,
                loading: action.payload.loading,
                error: action.payload.error,
                isProfileUpdated: action.payload.isUpdated,
                id: action.payload.id,
                name: action.payload.name,
                mobileNumber: action.payload.mobileNumber,
                email: action.payload.email,
                displayPicURL: action.payload.displayPicURL,
                borrowDetail: action.payload.borrowDetail,
                borrowError: action.payload.borrowError,
                borrowInfo: action.payload.borrowInfo,
                borrowBook: action.payload.borrowBook,

            }
        
        case actionType.SET_PROFILE_STATUS:
            return{
                ...state,
                token: action.payload.token,
                loading: action.payload.loading,
                error: action.payload.error,
                isProfileUpdated: action.payload.isUpdated,
                name: action.payload.name,
                mobileNumber: action.payload.mobileNumber,
                email: action.payload.email,
                displayPicURL: action.payload.displayPicURL

            }

        case actionType.SET_DATA:
            return{
                ...state,
                name: action.payload.name,
                mobileNumber: action.payload.mobileNumber,
                email: action.payload.email,
                displayPicURL: action.payload.displayPicURL
            }

        case actionType.BORROW_SUCCESS:
            return {
                ...state,
                borrowDetail: action.payload
            }

        case actionType.BORROW_FAIL:
            return {
                ...state,
                borrowError: action.payload
            }

        case actionType.BORROW_RESET:
            return{
                ...state,
                borrowDetail: action.payload
            }

        case actionType.BORROW_DETAIL:
            return{
                ...state,
                borrowInfo: action.payload.borrowInfo,
            }

        case actionType.PROFILE_ERROR:
            return{
                ...state,
                borrowBeforeLogin: action.payload.borrowBeforeLogin,
                isProfileUpdated: action.payload.isProfileUpdated,
                toggleState: action.payload.togState
            }

        case actionType.BOOK_AVAILABILITY:
            return {
                ...state,
                isBookAvailable: action.payload.isBookAvailable
            }

        case actionType.MAX_BORROW_LIMIT:
            return {
                ...state,
                numberOfBorrowedBookExceeded: action.payload.numberOfBorrowedBookExceeded,
                toggleState: action.payload.toggleState
            }
        default : 
            return state
    }
}

export default combineReducers({
    books: booksReducer
});