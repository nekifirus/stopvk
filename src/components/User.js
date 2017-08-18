import React, { Component } from 'react'

export default class User extends Component {
  
  componentDidMount() {
    this.props.handleCheckstatus();
  }

  render() {
    const { name, error } = this.props
    let template
  

    if (name) {
      template = <p>Привет, {name}! <button className="logoutbtn" onClick={this.props.handleLogout}>Выйти</button></p>
    } else {
      template = <div>
          <p className="App-intro">
            Эта программа поможет Вам удалиться из социальной сети Вконтакте. 
          </p>
          <p>Все что Вам нужно сделать для начала работы:</p>
          <button className="loginbtn" onClick={this.props.handleLogin}>ВОЙТИ</button>
        </div>
    }

    return <div className='user'>
        {template}
        {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
      </div>
  }
}