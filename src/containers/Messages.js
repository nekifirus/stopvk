import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as messActions from '../actions/MessActions';

import {Fetcher} from '../components/Interface';

import { FavView } from '../components/Favs';

class Mess extends Component {
  render() {
    const {mess} = this.props;
    const {
      initMessages,
      delMessages
    } = this.props.messActions;

    return (
      <div className="">
        <FavView
          title="Диалогов:"
          arr={mess.dialogsarr}
          get = {initMessages}
          del = {delMessages}
        />

        {mess.fetching &&
             <Fetcher trigger={mess.fetching}
                      message={mess.fetchmessage}
                      percent={mess.percent}
               />
          }
      </div>

    )


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
