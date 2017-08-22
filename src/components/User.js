import React, { Component } from 'react'

export default class User extends Component {
  
  
 
  render() {
    const { error, info, auth } = this.props
    const counters = info.counters
    let template
  

    if (auth) {
      template = <div>
            <img src={info.photo_100} alt='avatar' className="avatar"></img>

            <p>Привет, {info.first_name} {info.last_name}!</p> 
            <button className="logoutbtn" onClick={this.props.handleLogout}>Выйти</button>
            

            <table>
              <thead><tr><th>Данные в ВК</th></tr></thead>
              <tbody>
                <tr>
                  <th>Друзей</th>
                  <td>{counters.friends}</td>
                  <th>Интересных страниц</th>
                  <td>{counters.pages}</td>
                </tr>
              </tbody>
            </table>



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