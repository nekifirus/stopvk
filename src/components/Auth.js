import React, { Component } from 'react'




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
    } = this.props.auth;

    

    const authlink = 'https://oauth.vk.com/authorize?client_id=6244835&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,photos,audio,video,pages,notes,messages,wall,docs,groups&response_type=token&v=5.68&state=123456'
  return <div className="hero container has-text-centered">
    <div className="hero-body">
      <h2 className="title">Авторизация</h2>
      <p>Вконтакте "слишком" заботится о своих пользователях. Потому для редактирования всех данных в аккаунте, нужна хитрая авторизация. </p>
      <p>Нажмите на ссылку ниже. Откроется новая вкладка. Скопируйте все из адресной строки в открывшейся вкладке и вставьте в поле ниже</p>
      <br />
      <p><a className="button is-info" href={authlink} target="_blank">ЖМИ</a></p>


    </div>



    <div className="control">
      <div className="field">
        <input className="input" type="text" placeholder="Вставьте все из адресной строки сюда" value={link} onChange={ this.setLink.bind(this) } />
      </div>
    </div>
    <div>{error ? <p className="help is-danger">{error}</p> : ''}</div>
    <br />
    <p><button className="button is-primary" disabled={!isValid} onClick={this.pushLink.bind(this)}>ПОДТВЕРДИТЬ</button></p>

  </div>
  }
}
