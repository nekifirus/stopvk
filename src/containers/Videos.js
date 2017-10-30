import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as videosActions from '../actions/VideosActions';

import VideosView from '../components/Videos';
import {Fetcher} from '../components/Interface';


class Videos extends Component {
  render() {
    const {videos} = this.props;
    const {
      getVideos,
      delVideos,
      selectVideo,
      selectAllVideos,
      dropVideoSelection,
      showVideo,
      closeVideo
    } = this.props.videosActions;

    return <div>


    <VideosView videosarr={videos.videosarr}
                selected={videos.videoslength}
                get = {getVideos}
                del = {delVideos}  
                video={videos.video}
                show={videos.showvideo}
                showVideo={showVideo}
                closeVideo={closeVideo}
                select={selectVideo}
                selectAll={selectAllVideos}
                drop={dropVideoSelection}
    />

  {videos.fetching &&
       <Fetcher trigger={videos.fetching}
                message={videos.fetchmessage}
                percent={videos.percent}

         />
    }

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
