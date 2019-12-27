import React from 'react';
import { Route } from 'react-router-dom';
import BookList from './containers/BookList';
import Notification from './components/Notification';
import WrappedProfileUpdateForm from './components/Profile';
import Video from './components/Video';
import PDF from './components/PDF';
import Signup from './components/Signup';
import Login from './components/Login';

const BaseRouter = () => (
    <div>

        <Route exact path='/' component={props => <BookList {...props} />}  />
        <Route exact path='/notification' component={props => <Notification {...props} /> } />
        <Route exact path='/profile' component={props => <WrappedProfileUpdateForm {...props} /> } />
        <Route exact path='/video' component={props => <Video {...props} /> } />
        <Route exact path='/pdf' component={props => <PDF {...props} /> } />
        <Route exact path='/login' component={props => <Login {...props} /> } />
        <Route exact path='/signup' component={props => <Signup {...props} />} />
        
    </div>
);


export default BaseRouter;