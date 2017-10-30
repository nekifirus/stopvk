import React from 'react';

import {
  GroupButtons,
  SelectedIco,
  Counters,
  TitleButtonsGroup
} from './Interface';

export default class VideosView extends React.Component {
  componentDidMount() {
    this.props.get()
  }


  onSelectVideo (video, index) {
        this.props.select.call(this, video, index);
  }
  onPlayVideo (video) {
        this.props.showVideo.call(this, video);
  }
  onCloseVideo() {
    this.props.closeVideo.call(this)
  }
  render() {

    const { videosarr, selected, video, show, selectAll, drop, del, } = this.props;



    const VideoCard = (({video, index}) => (
      <div className="box album-card">
        <div className="album-cover">

          <img className="image" src={video.photo_320 || video.photo_130} alt={video.title}/>

          <div className="album-title has-text-centered">
              {video.title}
              <TitleButtonsGroup
                check={this.onSelectVideo.bind(this, video, index)}
                play={this.onPlayVideo.bind(this, video, index)}
              />
          </div>
          <SelectedIco trigger={video.isSelected} />
        </div>

      </div>
    ));



    const VideosGroup = videosarr.map((video, index) => (
      <VideoCard key ={video.id} video={video} index={index} />
    ));



    return(
      <div className="box">
        <Counters all={videosarr.length} selected={selected}/>
        <GroupButtons selectAll={selectAll} drop={drop} del={del} />

        <div className="albums-group">
              {VideosGroup}
        </div>

        <div className={show ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={this.onCloseVideo.bind(this)}></div>
          <div className="modal-card">
            <iframe className="player" title={video.title} src={video.player} />
          </div>
          <button className="modal-close is-large" aria-label="close"
            onClick={this.onCloseVideo.bind(this)}></button>
        </div>

      </div>

    )
  }
}
