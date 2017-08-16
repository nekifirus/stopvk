import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as userActions from '../actions/UserActions';
import User from '../components/User';
import '../stylesheets/App.css'

class App extends Component {
  render() {
    const { user } = this.props
    const { handleLogin } = this.props.userActions


    return <div>
        <User name={user.name} handleLogin={handleLogin} error={user.error} />

      </div>
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)