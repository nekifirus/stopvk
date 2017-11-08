import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Jumbotron extends Component {
  render() {
  return <div className="hero is-medium is-marginless">
    <div className="hero-body container has-text-centered">
      <h1 className="title">
        <span className="fa-stack fa-lg">
          <i className="fa fa-vk fa-stack-1x" aria-hidden="true"></i>
          <i className="has-text-danger fa fa-ban fa-stack-2x text-danger" aria-hidden="true"></i>
        </span>
        STOPVK
      </h1>
      <br /> <br />
      <h2 className="subtitle">Приложение для управления личными данными в социальной сети "Вконтакте".</h2>
      <p className="has-text-left">
        В России за лайки и репосты можно угодить в тюрьму. Интересная деталь - в подавляющем большинстве случаев, в тюрьму попадают за лайки и репосты в социальной сети "Вконтакте".
      </p>
      <br />
      <p className="has-text-left">
        Это происходит, скорее всего, потому, что "сажальщики", к счастью, другими соц.сетями пользоваться не умеют, а "Вконтакте", судя по всему, дает силовикам полный доступ к вашей странице - к переписке, лайкам, репостам, фотографиям.
      </p>
      <br />
      <p className="has-text-left">
        Это приложение не кнопка "удалить все", а лишь способ управления личными данными.
      </p>
      <br />
      <p className="subtitle">
        В настоящий момент приложение может:
      </p>
      <br />
      <p className="has-text-left">
        Фотографии - сохранение альбомов (в том числе системных) или выбранных фотографий. Удаление фотографий. Снятие отметок в "Фотографиях со мной", снятие лайков в "Понравившихся фотографиях".
      </p>
      <br />
      <p className="has-text-left">
        Друзья - выбор и массовое удаление выбранных.
      </p>
      <br />
      <p className="has-text-left">
        Группы - выбор и массовое удаление выбранных.
      </p>
      <br />
      <p className="has-text-left">
        Видео - выбор и массовое удаление выбранных.
      </p>
      <br />
      <p className="has-text-left">
          Закладки(то, что вы лайкнули): удаление из закладок постов, ссылок, людей, групп, товаров, видеозаписей. Фотографии, которые вам понравились - доступны в разделе "Фото". </p>
      <br />
      <p className="has-text-left">
        Сообщения - удаление всех сообщений.
      </p>

      <br />
      <p className="has-text-left">
        Стена - удаление всех записей на стене.
      </p>


      <br />
      <p className="subtitle">
        Для начала работы Вам нужно:
      </p>
      <Link to="/auth" className="button is-info is-large">
        <span className="icon">
          <i className="fa fa-vk"></i>
        </span>
        <span>Войти</span>
      </Link>


    </div>
  </div>
  }
}
