import React, { Component } from 'react'
import '../stylesheets/Layout.css'



export default class Layout extends Component {
  render () {
    return <div className="App">
        <div className="Header">
          <div className="Logo">StopVK</div>
          <div className="Nav"></div>
          <div className="rightbut loginbtn">Войти</div>
        </div>
        <div className="Main">{this.props.children}</div>
        <div className="Footer"></div>
    </div>

  }
}
