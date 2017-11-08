import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as authActions from '../actions/AuthActions';
import Authform from '../components/Auth'



class Auth extends Component {

  render() {
    const {auth} = this.props
    const {setLink, pushLink, setId, pushId, initAuth} = this.props.authActions

    return <div>
      <Authform
        auth={auth}
        setId={setId}
        pushId={pushId}
        setLink={setLink}
        pushLink={pushLink}
        initAuth={initAuth}
      />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
