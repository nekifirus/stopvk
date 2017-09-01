import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as authActions from '../actions/AuthActions';
import Authform from '../components/Auth'



class Auth extends Component {

  render() {
    const {user} = this.props
    const {auth} = this.props
    const {setLink, pushLink} = this.props.authActions

    return <div>
      <Authform auth={auth} setLink={setLink} pushLink={pushLink} />
    </div>
  }
}

function mapStateToProps(state) {
  return {user: state.user, auth: state.auth}
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
