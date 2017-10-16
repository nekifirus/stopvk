import React from 'react';



export default class FriendsView extends React.Component {
  onSelectFriend (friend, idx) {
        this.props.select.call(this, friend, idx);
    }
  render() {
    const { friendsarr, selectAll } = this.props;


    const FriendCard = ({friend, idx}) => <div
                className={friend.isSelected ? "card selected" : "card"}
                onClick={this.onSelectFriend.bind(this, friend, idx)}>
        <div className="card-image">
          <img src={friend.photo_max} alt={friend.first_name + " " + friend.last_name}></img>
          <div className={friend.isSelected ? "select-ico fa-3x" : "is-invisible"}>
              <i className="fa fa-circle fa-stack-1x" aria-hidden="true"></i>
              <i className="fa fa-check-circle fa-inverse fa-stack-1x" aria-hidden="true"></i>
           </div>
        </div>
        <div className="card-content">
          <a href={"https://vk.com/" + friend.domain}
             target="_blank"
             rel="noopener noreferrer">
             @{friend.domain}
          </a>
          <p>{friend.first_name}</p>
          <p>{friend.last_name}</p>
          <p>Общих друзей: {friend.common_count}</p>
        </div>
      </div>


    const FriendsGroup = friendsarr.map((friend, index) => <FriendCard
            key={friend.id} friend={friend} idx={index} />


    );


    return (
      <div>
        <p><button type="button" onClick={selectAll}>Выбрать всех</button></p>
        <div className="card-group">
          {FriendsGroup}
        </div>
      </div>

    )
  }
}
