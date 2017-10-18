import React from 'react';



export default class VideosView extends React.Component {
  onSelectVideo (video, index) {
        this.props.select.call(this, video, index);
  }
  onClickVideo (video) {
        this.props.showVideo.call(this, video);
  }
  onCloseVideo() {
    this.props.closeVideo.call(this)
  }
  render() {

    const { videosarr, video, show, selectAll } = this.props;



    const VideoCard = (({video, index}) => <div
        className={video.isSelected ? "card selected" : "card"}  key={video.id.toString()}
        onClick={this.onSelectVideo.bind(this, video, index)}>

        <div className="card-image">
          <img className="image" src={video.photo_320 || video.photo_130} alt={video.title}/>
          <div className={video.isSelected ? "select-ico fa-3x" : "is-invisible"}>
              <i className="fa fa-circle fa-stack-1x" aria-hidden="true"></i>
              <i className="fa fa-check-circle fa-inverse fa-stack-1x" aria-hidden="true"></i>
          </div>
          <div className="play-button">
            <i className="fa fa-5x fa-youtube-play" aria-hidden="true"
              onClick={this.onClickVideo.bind(this, video)}></i>
          </div>


        </div>
        <div className="card-content">
          <h3>{video.title}</h3>

        </div>

    </div>

    );

    const VideosGroup = videosarr.map((video, index) => <VideoCard video={video} index={index} />
      );







    return(
      <div>
        <button type="button" className="button is-primary"
                onClick={selectAll}>Выделить все</button>

        <div className="card-group">
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
