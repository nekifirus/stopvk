import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as wallActions from '../actions/WallActions';

import Wall from '../components/Wall';



class Textdata extends Component {

  render() {
    const {wall} = this.props



    return <div>
      <Wall
        length={wall.length}
        trigger={wall.trigger}
        fetching={wall.fetching}
        fetchmessage={wall.fetchmessage}
        completemess={wall.completemess}
        error = {wall.error}
        wallActions={this.props.wallActions}
      />


      </div>
  }
}

function mapStateToProps(state) {
  return {wall: state.wall}
}

function mapDispatchToProps(dispatch) {
  return {
    wallActions: bindActionCreators(wallActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Textdata)
