import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as wallActions from '../actions/WallActions';

import { Wall as Wallcomponent } from '../components/Wall';
import {Fetcher} from '../components/Interface';



class Wall extends Component {

  render() {
    const {wall} = this.props;
    const {
      requestWallPosts,
      deletePosts,
      stopWallDelete
    } = this.props.wallActions;



    return (
      <div>
        <Wallcomponent
          posts={wall.posts}
          trigger={wall.trigger}
          get={requestWallPosts}
          del={deletePosts}

        />

      {wall.fetching &&
        <Fetcher
          trigger={wall.fetching}
          message={wall.fetchmessage}
          percent={wall.percent}
          cancel={stopWallDelete}
      />}

      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Wall)
