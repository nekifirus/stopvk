import React from 'react';

import {
  GroupButtons,
  SelectedIco,
  Counters
} from './Interface';



export default class FriendsView extends React.Component {
  onSelectFriend (friend, idx) {
        this.props.select.call(this, friend, idx);
  }

    componentDidMount() {
      this.props.get()
    }
  render() {
    const { friendsarr, friendsselected, selectAll, drop, del } = this.props;


    const FriendCard = ({friend, idx}) => (
      <div className="box album-card"
           onClick={this.onSelectFriend.bind(this, friend, idx)}>

        <div className="album-cover">
          <img src={friend.photo_max} alt={friend.first_name + " " + friend.last_name}></img>

          <div className="album-count">
              <i className="fa fa-user-circle"></i>
              {" " + friend.common_count}
          </div>

          <div className="album-title has-text-centered">
            {friend.first_name + " " + friend.last_name}
            <br />
            <a href={"https://vk.com/" + friend.domain}
               target="_blank"
               rel="noopener noreferrer">
               @{friend.domain}
            </a>
          </div>
          <SelectedIco trigger={friend.isSelected} />
        </div>



      </div>
    );





    const FriendsGroup = friendsarr.map((friend, index) => (
      <FriendCard key={friend.id} friend={friend} idx={index} />
    ));


    return (
      <div className="box">
        <Counters all={friendsarr.length} selected={friendsselected}/>
        <GroupButtons selectAll={selectAll} drop={drop} del={del} />

        <div className="albums-group">
          {FriendsGroup}
        </div>
      </div>

    )
  }
}
