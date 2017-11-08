import React, {Component} from 'react';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { withRouter, Link } from 'react-router-dom'

import User from '../components/User';
import Menu from '../components/Menu';
import Jumbotron from '../components/Jumbotron';
import * as authActions from '../actions/AuthActions';

import '../stylesheets/App.css';

export const NavBar = (({user}) =>(
  <div className="navbar is-black">
    <div className="is-pulled-left navbar-brand">
      <Link to="/" className="navbar-brand navbar-item is-large">
        <span className="fa-stack fa-lg">
          <i className="fa fa-vk fa-stack-1x" aria-hidden="true"></i>
          <i className="has-text-danger fa fa-ban fa-stack-2x text-danger" aria-hidden="true"></i>
        </span>
        StopVK
      </Link>
    </div>
    <div className="is-pulled-right">
      {user}
    </div>
  </div>


));


class App extends Component {


  render() {
    const {auth} = this.props;
    const {logout} = this.props.authActions;




    return (
    <div>
      <NavBar user={<User auth={auth} logout={logout} />}></NavBar>


      {auth.access_token &&
          <div className="columns">
            <div className="column box is-3">
                <Menu />
            </div>
            <div className="column is-paddingless">
              {this.props.children}
            </div>
          </div>
      }
      {!auth.access_token &&
        <Jumbotron />
      }


    </div>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
