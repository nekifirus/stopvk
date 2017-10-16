import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as friendsActions from '../actions/FriendsActions';

import { FavView } from '../components/Favs';
import FriendsView from '../components/Friends';


class Friends extends Component {
  render() {
    const {friends} = this.props;
    const {
      getFriends,
      unFriend,
      selectFriend,
      selectAllFriends
    } = this.props.friendsActions;

    return <div>
      <FavView
        title="У вас друзей:"
        length={friends.friendslength}
        fetching={friends.fetching}
        fetchmessage={friends.fetchmessage}
        completemess={friends.completemess}
        error = {friends.error}
        get = {getFriends}
        del = {unFriend}
      />

    <FriendsView friendsarr={friends.friendsarr}
                 select={selectFriend}
                 selectAll={selectAllFriends} />

  </div>

  }
}


function mapStateToProps(state) {
  return {friends: state.friends}
}

function mapDispatchToProps(dispatch) {
  return {
    friendsActions: bindActionCreators(friendsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
