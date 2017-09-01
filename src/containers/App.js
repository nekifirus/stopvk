import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as userActions from '../actions/UserActions';
import User from '../components/User';
import Jumbotron from '../components/Jumbotron'
import '../stylesheets/App.css'

class App extends Component {

  componentWillMount() {
    this.props.userActions.handleCheckstatus();
  }

  render() {
    const {user} = this.props
    const {handleLogin} = this.props.userActions
    const {handleLogout} = this.props.userActions

    return <div className="App">
      <div className="App-header">
        <h2>StopVK</h2>
        <Link to="/about">About</Link>
      </div>

      {this.props.user.auth
        ? (<User info={user.info} handleLogout={handleLogout} error={user.error}/>)
        : <Jumbotron handleLogin={handleLogin}/>
      }
    </div>
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
