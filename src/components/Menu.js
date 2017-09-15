import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = () => <div>

  <nav className="panel is-hidden-mobile">
      <div><NavLink className="panel-block" activeClassName="is-active" to="Wall">Стена</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="Notes">Заметки</NavLink></div>
      <div><NavLink className="panel-block" activeClassName="is-active" to="Photos">Фотографии</NavLink></div>
  </nav>

  <div className="tabs is-centered is-boxed is-hidden-tablet">
    <ul>
      <li><NavLink activeClassName="is-active" to="Wall">Стена</NavLink></li>
      <li><NavLink activeClassName="is-active" to="Notes">Заметки</NavLink></li>
      <li><NavLink activeClassName="is-active" to="Photos">Фотографии</NavLink></li>

    </ul>

  </div>

</div>
export default Menu;
