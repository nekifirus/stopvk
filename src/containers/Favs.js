import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as favsActions from '../actions/FavsActions';

import { FavView } from '../components/Favs';


class Favs extends Component {

  render() {
    const
      { favs } = this.props,
      { favegetLinks,
        favedelLinks,
        favegetUsers,
        favedelUsers
      } = this.props.favsActions;



    return <div>
      <FavView
        title="Ссылок в закладках:"
        length={favs.linklength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetLinks}
        del = {favedelLinks}
      />
    
      <FavView
        title="Пользователей в закладках:"
        length={favs.userlength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetUsers}
        del = {favedelUsers}
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
