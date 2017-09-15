import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Jumbotron extends Component {
  render() {
  return <div className="hero is-medium is-marginless">
    <div className="hero-body container has-text-centered">
      <h1 className="title">STOPVK</h1>
      <h2 className="subtitle">Эта программа поможет Вам удалиться из социальной сети Вконтакте.</h2>
      <p>Все что Вам нужно сделать для начала работы:
          <Link to="/auth" className="button is-primary">ВОЙТИ</Link>
      </p>
    </div>
  </div>
  }
}
