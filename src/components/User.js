import React, { Component } from 'react'

export default class User extends Component {
  
  componentWillMount() {
    this.props.handleCheckstatus();
  }
 
  render() {
    const { error, info, auth } = this.props
    let template
  

    if (auth) {
      template = <div>
            <img src={info.photo_50}></img>

            <p>Привет, {info.first_name} {info.last_name}!</p> 
            <button className="logoutbtn" onClick={this.props.handleLogout}>Выйти</button>
          </div>
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