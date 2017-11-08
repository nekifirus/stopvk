import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class User extends Component {

  render() {
    const { auth, logout } = this.props;

    const LoginButton = (() => (
      <Link
        className="button is-info" to="/auth">
        <span className="icon">
          <i className="fa fa-vk"></i>
        </span>
        <span>Войти</span>
      </Link>
    ));

    const UserPhoto = (({info}) => (
      <div className="dropdown is-hoverable is-right">

          <div className="user-photo dropdown-trigger">
            <img className="user-photo" src={info.photo_50} alt="avatar"></img>
          </div>
          <div className="dropdown-menu" id="dropdown1" role="menu">
            <div className="dropdown-content has-text-centered">
              <img className="" src={info.photo_50} alt="avatar" />
              <a className="subtitle"
                 href={"https://vk.com/id" + info.id} target="_blank">
                {info.first_name} {info.last_name}
              </a>
              <hr className="dropdown-divider" />
              <button onClick={logout} className="button is-danger">Выйти</button>
            </div>
          </div>
      </div>
    ));


    return (
      <div className="user-info">
        {auth.access_token
        ?
          <UserPhoto info={auth.info} />
        :
          <LoginButton />
        }
      </div>
    )

  }
}
