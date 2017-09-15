import React, { Component } from 'react'

export default class User extends Component {



  render() {
    const { error, info } = this.props




    return <div className="box">
            <div className="level media">
              <div className="level-left media-left">
                <img className="image is-32-32 is-rounded" src={info.photo_50} alt='avatar'></img>
              </div>
              <div className="level-right media-content has-text-weight-bold">
                <div className="content">
                {info.first_name + " "} {info.last_name}
                {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
                </div>
              </div>
            </div>
          </div>

  }
}
