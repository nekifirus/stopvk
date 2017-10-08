import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as messActions from '../actions/MessActions';

import { FavView } from '../components/Favs';


class Mess extends Component {
  render() {
    const {mess} = this.props;
    const {
      getMessages,
      delMessages
    } = this.props.messActions;

    return <div>
      <FavView
        title="Личных сообщений:"
        length={mess.messageslength}
        fetching={mess.fetching}
        fetchmessage={mess.fetchmessage}
        completemess={mess.completemess}
        error = {mess.error}
        get = {getMessages}
        del = {delMessages}
      />
  </div>

  }
}


function mapStateToProps(state) {
  return {mess: state.mess}
}

function mapDispatchToProps(dispatch) {
  return {
    messActions: bindActionCreators(messActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mess)
