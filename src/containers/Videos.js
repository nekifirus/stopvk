import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as videosActions from '../actions/VideosActions';

import { FavView } from '../components/Favs';
import VideosView from '../components/Videos';



class Videos extends Component {
  render() {
    const {videos} = this.props;
    const {
      getVideos,
      delVideos,
      selectVideo,
      selectAllVideos,
      showVideo,
      closeVideo
    } = this.props.videosActions;

    return <div>
      <FavView
        title="У вас видеозаписей:"
        length={videos.videoslength}
        fetching={videos.fetching}
        fetchmessage={videos.fetchmessage}
        completemess={videos.completemess}
        error = {videos.error}
        get = {getVideos}
        del = {delVideos}
      />

    <VideosView videosarr={videos.videosarr}
                video={videos.video}
                show={videos.showvideo}
                showVideo={showVideo}
                closeVideo={closeVideo}
                select={selectVideo}
                selectAll={selectAllVideos} />

  </div>

  }
}


function mapStateToProps(state) {
  return {videos: state.videos}
}

function mapDispatchToProps(dispatch) {
  return {
    videosActions: bindActionCreators(videosActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos)
