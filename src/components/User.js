import React, { Component } from 'react'

export default class User extends Component {
  render() {
    const { name, error } = this.props
    let template

    if (name) {
      template = <p>Привет, {name}! </p>
    } else {
      template = <button className="loginbtn" onClick={this.props.handleLogin}>ВОЙТИ</button>
    }

    return <div className='user'>
        {template}
        {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
      </div>
  }
}