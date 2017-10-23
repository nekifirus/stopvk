import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = () => <div>

  <nav className="panel is-hidden-mobile">
      <div><NavLink className="panel-block" activeClassName="is-active" to="/wall">Стена</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/favs">Закладки</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/favphotos">FAVФотографии</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/messages">Личные сообщения</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/groups">Группы</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/friends">Друзья</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/notes">Заметки</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/docs">Документы</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/videos">Видеозаписи</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="/photos">Фотографии</NavLink></div>

  </nav>

  <div className="tabs is-centered is-boxed is-hidden-tablet">
    <ul>
      <li><NavLink activeClassName="is-active" to="/wall">Стена</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/favs">Закладки</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/favphotos">FAVФотографии</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/messages">Личные сообщения</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/groups">Группы</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/friends">Друзья</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/notes">Заметки</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/docs">Документы</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/videos">Видеозаписи</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/photos">Фотографии</NavLink></li>

    </ul>

  </div>

</div>
export default Menu;
