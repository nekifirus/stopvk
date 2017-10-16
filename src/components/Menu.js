import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = () => <div>

  <nav className="panel is-hidden-mobile">
      <div><NavLink className="panel-block" activeClassName="is-active" to="/wall">Стена</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/favs">Закладки</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/photos">Фотографии</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/messages">Личные сообщения</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/groups">Группы</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/friends">Друзья</NavLink></div>
  </nav>

  <div className="tabs is-centered is-boxed is-hidden-tablet">
    <ul>
      <li><NavLink activeClassName="is-active" to="/wall">Стена</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/favs">Закладки</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/photos">Фотографии</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/messages">Личные сообщения</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/groups">Группы</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/friends">Друзья</NavLink></li>


    </ul>

  </div>

</div>
export default Menu;
