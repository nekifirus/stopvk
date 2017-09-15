import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as favsActions from '../actions/FavsActions';

import { FavLinks } from '../components/Favs';


class Favs extends Component {

  render() {
    const { favs } = this.props



    return <div>
      <FavLinks
        length={favs.linklength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        favsActions={this.props.favsActions}
      />


      </div>
  }
}

function mapStateToProps(state) {
  return {favs: state.favs}
}

function mapDispatchToProps(dispatch) {
  return {
    favsActions: bindActionCreators(favsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favs)
