import React, { Component } from 'react';

import {NavBar} from '../containers/App';

import { Redirect } from 'react-router-dom';



export default class Authform extends Component {

  componentDidMount() {
    this.props.initAuth();
  }

  setLink(e) {
    const { setLink } = this.props
    const link = e.target.value
    setLink(link)
  }

  pushLink(e) {
    e.preventDefault()
    const { pushLink } = this.props
    pushLink()

  }

  setId(e) {
    const { setId } = this.props;
    const id = e.target.value;
    setId(id);
  }

  pushId(e) {
    e.preventDefault()
    const { pushId } = this.props;
    pushId();

  }


  render() {
    const {
      isValid,
      error,
      link,
      id,
      authlink,
      access_token,
      user_id
    } = this.props.auth;




  return (
    <div>
        {access_token && user_id &&
        <Redirect to="/" />
        }
        <NavBar />
        <div className="hero container has-text-centered">
          <div className="hero-body">
            <h2 className="title">Авторизация</h2>
            <p className="has-text-left">
              Вконтакте заботится о своих пользователях и считает,
              что нельзя массово сохранять фотографии и снимать лайки.
              Это противоречит их интересам.
              Поэтому для работы в приложении, нужна хитрая авторизация.
            </p>
            <br />
            <ol>
              <li className="has-text-left">
                Перейдите  <a href="https://vk.com/editapp?act=create" target="_blank" rel="noopener noreferrer">по этой ссылке.</a>
                В вашем аккаунте создастся приложение, напишите чего-нибудь для названия.
                Нажмите "Подключить приложение".
                <img className="image" src={process.env.PUBLIC_URL + "/instruct1.jpg"} alt="В поле 'Название' напишите чего-нибудь"/>
                <br />
              </li>
              <li className="has-text-left">
                Перейдите в "Настройки". Выберите "Приложение включено и видно всем".
                OPENApi "Включен". Адрес сайта и базовый домен - напишите что угодно.
                Нажмите "Сохранить изменения" чуть ниже.
                <img className="image" src={process.env.PUBLIC_URL + "/instruct2.jpg"} alt='Перейдите в "Настройки". Выберите "Приложение включено и видно всем".
                OPENApi "Включен". Адрес сайта и базовый домен - напишите что угодно.
                Нажмите "Сохранить изменения" чуть ниже.'/>
                <br />
              </li>
              <li className="has-text-left">
                Скопируйте ID приложения и вставьте его в поле ниже.
                <img className="image" src={process.env.PUBLIC_URL + "/instruct3.jpg"} alt='Скопируйте ID приложения и вставьте его в поле ниже'/>
                <br />
              </li>
              <li className="has-text-left">
                <div className="control">
                  <div className="field">
                    <input className="input" type="text" placeholder="Вставьте ID сюда" value={id} onChange={ this.setId.bind(this) } />
                  </div>
                  <p><button className="button is-info" disabled={!id} onClick={this.pushId.bind(this)}>ПОДТВЕРДИТЬ</button></p>
                </div>
              </li>
              <li className="has-text-left">
                <p>Нажмите на ссылку ниже. Откроется новая вкладка. Скопируйте все из адресной строки в открывшейся вкладке и вставьте в поле ниже</p>
                <br />
                <p><a className="button is-info" disabled={!authlink} href={authlink} target="_blank">ЖМИ</a></p>
              </li>
              <li className="has-text-left">
                <div className="control">
                  <div className="field">
                    <input className="input" type="text" placeholder="Вставьте все из адресной строки сюда" value={link} onChange={ this.setLink.bind(this) } />
                  </div>
                </div>
                <div>{error ? <p className="help is-danger">{error}</p> : ''}</div>
                <br />
                <p><button className="button is-inf" disabled={!isValid} onClick={this.pushLink.bind(this)}>ПОДТВЕРДИТЬ</button></p>

              </li>
            </ol>




          </div>




        </div>
    </div>
   )
  }
}
