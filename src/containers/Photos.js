import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as photoActions from '../actions/PhotoActions';


import AlbumsView from '../components/Photos.js';
import ModalGalery from '../components/ModalGalery';
import {Downloader, Fetcher} from '../components/Interface';





class Photos extends React.Component {

  render(){
    const {photos, downloader} = this.props;
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
      saveSelected,
      delAlbums
    } = this.props.photoActions;

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
          album={photos.albumtoview}
          trigger={photos.viewtrigger}
          close={closeAlbumView}
          select={selectImginAlbum}
          selectAll={selectAllIMGinAlbum}
          drop={dropIMGselectioninALbums}
          save={saveSelectedImagesInAlbum}
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
        />
      }


    </div>
  }
}

function mapStateToProps(state) {
  return {photos: state.photos, downloader: state.downloader}
}

function mapDispatchToProps(dispatch) {
  return {
    photoActions: bindActionCreators(photoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
