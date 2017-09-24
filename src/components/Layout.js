import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../stylesheets/Layout.css';



export default class Layout extends Component {
  render () {
    return <div className="container is-fullhd">

        <div className="navbar is-black">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item is-large">StopVK</Link>
          </div>
        </div>
      

      <div className="section">
        <div className="Main">{this.props.children}</div>
      </div>


        <div className="footer">

          <h3>license: <a href="https://opensource.org/licenses/mit-license.php">MIT</a></h3>
          <Link to="/about" className="is-puled-right">О проекте</Link>
        </div>

    </div>

  }
}
