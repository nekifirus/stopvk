import React, { Component } from 'react'

export default class User extends Component {



  render() {
    const { error, info } = this.props




    return <div className='user'>
        <div>
            <img src={info.photo_100} alt='avatar' className="avatar"></img>

            <p>Привет, {info.first_name} {info.last_name}!</p>
            
          </div>
        {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
      </div>
  }
}
