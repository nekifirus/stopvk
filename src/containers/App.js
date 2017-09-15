import React, {Component} from 'react';


import {connect} from 'react-redux';

import User from '../components/User';
import Menu from '../components/Menu';
import Wall from '../containers/Wall';
import '../stylesheets/App.css';


class App extends Component {


  render() {
    const {info} = this.props.auth


    return <div className="columns">
      <div className="column is-3">
        <User info={info}/>
        <Menu />
      </div>
      <div className="column is-centered">
        <Wall />
      </div>
      <div className="column is-1">
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps)(App)
