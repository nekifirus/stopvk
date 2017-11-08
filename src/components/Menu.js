import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = (({to, title, icon}) => (
  <NavLink className="panel-block" activeClassName="is-active" to={to}>
    <span className="icon">
      <i className={"fa " + icon}></i>
    </span>
    <span>{title}</span>
  </NavLink>
));

const NavItemTab = (({to, title, icon}) => (
  <NavLink className="li" activeClassName="is-active" to={to}>
    <span className="icon">
      <i className={"fa " + icon}></i>
    </span>
    <span>{title}</span>
  </NavLink>
));


const Menu = () => <div>

  <nav className="panel is-hidden-mobile">
      <div><NavItem to={"/photos"} title={"Фотографии"} icon={"fa-camera"} /></div>
      <div><NavItem to={"/friends"} title={"Друзья"} icon={"fa-user"} /></div>
      <div><NavItem to={"/groups"} title={"Группы"} icon={"fa-users"} /></div>
      <div><NavItem to={"/videos"} title={"Видеозаписи"} icon={"fa-film"} /></div>
      <div><NavItem to={"/messages"} title={"Сообщения"} icon={"fa-commenting"} /></div>
      <div><NavItem to={"/wall"} title={"Стена"} icon={"fa-bars"} /></div>
      <div><NavItem to={"/favs"} title={"Закладки"} icon={"fa-heart"} /></div>
      <div><NavItem to={"/notes"} title={"Заметки"} icon={"fa-sticky-note"} /></div>
      <div><NavItem to={"/docs"} title={"Документы"} icon={"fa-file"} /></div>




  </nav>

  <div className="tabs is-toggle is-centered is-boxed is-hidden-tablet">
    <ul>
      <NavItemTab to={"/photos"} title={"Фотографии"} icon={"fa-camera"} />
      <NavItemTab to={"/friends"} title={"Друзья"} icon={"fa-user"} />
      <NavItemTab to={"/groups"} title={"Группы"} icon={"fa-users"} />
      <NavItemTab to={"/videos"} title={"Видеозаписи"} icon={"fa-film"} />
      <NavItemTab to={"/messages"} title={"Сообщения"} icon={"fa-commenting"} />
      <NavItemTab to={"/wall"} title={"Стена"} icon={"fa-bars"} />
      <NavItemTab to={"/favs"} title={"Закладки"} icon={"fa-heart"} />
      <NavItemTab to={"/notes"} title={"Заметки"} icon={"fa-sticky-note"} />
      <NavItemTab to={"/docs"} title={"Документы"} icon={"fa-file"} />

    </ul>

  </div>

</div>
export default Menu;
