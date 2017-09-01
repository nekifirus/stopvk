import React, { Component } from 'react'
import '../stylesheets/Auth.css'



export default class Authform extends Component {

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

  render() {
    const {
      isValid,
      error,
      link
    } = this.props.auth

    const authlink = 'https://oauth.vk.com/authorize?client_id=6151047&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,photos,audio,video,pages,notes,messages,wall,docs,groups,offline&response_type=token&v=5.68&state=123456'
  return <div className="auth">
    <h3>Авторизация</h3>
    <div className="auth_intro">
      <p>Вконтакте "слишком" заботится о своих пользователях. Потому для редактирования всех данных в аккаунте, нужна хитрая авторизация. </p>
      <p>Нажмите на ссылку ниже. Откроется новая вкладка. Скопируйте все из адресной строки в открывшейся вкладке и вставьте в поле ниже</p>
    </div>
    <a href={authlink} className="auth_link" target="_blank">ЖМИ</a>
    <form className='auth_form'>
      <input className="auth_input" placeholder="Вставьте все из адресной строки сюда" value={link} onChange={ this.setLink.bind(this) } />
      {error ? <p className="error">{error}</p> : ''}
      <button className="auth_submit" disabled={!isValid} onClick={this.pushLink.bind(this)}>ПОДТВЕРДИТЬ</button>
    </form>

  </div>
  }
}
