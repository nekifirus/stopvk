import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {connect} from 'react-redux';

import User from '../components/User';
import Auth from './Auth'
import '../stylesheets/App.css'


class App extends Component {


  render() {
    const {auth} = this.props


    return <div>
            {auth.user_id
              ? (<User info={auth.info}/>)
              : <Auth/>
            }

            

          </div>
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps)(App)
