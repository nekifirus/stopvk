import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as photoActions from '../actions/PhotoActions';
import * as captchaActions from '../actions/CaptchaActions'


import AlbumsView from '../components/Photos.js';
import ModalGalery from '../components/ModalGalery';
import Captcha from '../components/Captcha';


import {Downloader, Fetcher} from '../components/Interface';





class Photos extends React.Component {

  render(){
    const {photos, downloader, captcha} = this.props;
    const {
      getAlbums,

      selectAlbum,
      selectAllAlbums,
      dropSelectionAlbums,

      selectImginAlbum,
      selectAllIMGinAlbum,
      dropIMGselectioninALbums,

      viewAlbum,
      closeAlbumView,

      saveAlbum,
      saveSelectedImagesInAlbum,
      saveSelectedAlbums,

      delAlbums,
      delSelectedInAlbum
    } = this.props.photoActions;

    const {
      setCaptcha,
      submitCaptcha,
      cancelCaptcha
    } = this.props.captchaActions;

    return <div className="">
      <AlbumsView
        albums={photos.photoalbums}
        selectedalbums={photos.selectedalbums}
        getAlbums={getAlbums}

        selectAlbum={selectAlbum}
        selectAll={selectAllAlbums}
        drop={dropSelectionAlbums}

        viewAlbum={viewAlbum}
        saveAlbum={saveAlbum}

        save={saveSelectedAlbums}
        del={delAlbums}
        />

      {photos.viewtrigger &&
        <ModalGalery
          album={photos.photoalbums[photos.albumtoview]}
          trigger={photos.viewtrigger}
          close={closeAlbumView}
          select={selectImginAlbum}
          selectAll={selectAllIMGinAlbum}
          drop={dropIMGselectioninALbums}
          save={saveSelectedImagesInAlbum}
          del={delSelectedInAlbum}
        />
      }

      {downloader.trigger &&
        <Downloader
          trigger={downloader.trigger}
          percent={downloader.percent}
          file={downloader.file}
        />

      }

      {photos.fetching &&
        <Fetcher trigger={photos.fetching}
                 message={photos.fetchmessage}
                 percent={photos.percent}
        />
      }

      {captcha.captcha_img &&
        <Captcha
            captcha_img={captcha.captcha_img}
            captcha_key={captcha.captcha_key}
            setCaptcha={setCaptcha}
            submitCaptcha={submitCaptcha}
            cancelCaptcha={cancelCaptcha}

        />

      }


    </div>
  }
}

function mapStateToProps(state) {
  return {photos: state.photos, downloader: state.downloader, captcha: state.captcha }
}

function mapDispatchToProps(dispatch) {
  return {
    photoActions: bindActionCreators(photoActions, dispatch),
    captchaActions: bindActionCreators(captchaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
