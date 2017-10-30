import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as friendsActions from '../actions/FriendsActions';

import FriendsView from '../components/Friends';
import {Fetcher} from '../components/Interface';


class Friends extends Component {
  render() {
    const {friends} = this.props;
    const {
      getFriends,
      unFriend,
      selectFriend,
      selectAllFriends,
      dropFriendsSelection
    } = this.props.friendsActions;

    return <div>

    <FriendsView friendsarr={friends.friendsarr}
                 friendsselected={friends.friendsselected}
                 get={getFriends}
                 del={unFriend}
                 select={selectFriend}
                 selectAll={selectAllFriends}
                 drop={dropFriendsSelection}
    />


    {friends.fetching &&
       <Fetcher trigger={friends.fetching}
                message={friends.fetchmessage}

         />
    }

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
