import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as favsActions from '../actions/FavsActions';


import PhotoGallery from '../components/Galery';
import { FavView } from '../components/Favs';

import Captcha from '../components/Captcha';




class Gallery extends React.Component {

  render(){
    const {favs} = this.props;
    const {
      favegetPhotos,
      favedelPhotos,
      showFavGalery,
      showMoreFavPhotos,
      selectFavPhoto,
      selectAllFavPhotos,
      setCaptcha,
      submitCaptcha,
      cancelCaptcha
    } = this.props.favsActions;

    return <div className="">
      <FavView
        title="Фотографий в закладках:"
        length={favs.photolength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetPhotos}
        del = {favedelPhotos}
      />

    <PhotoGallery
      images={favs.photoarr}
      trigger={favs.gallerytrigger}
      showGalery = {showFavGalery}
      showMorePhotos = {showMoreFavPhotos}
      selectPhoto = {selectFavPhoto}
      selectAll = {selectAllFavPhotos}
    />

    {favs.captcha_img
      ?
      <Captcha
        captcha_img={favs.captcha_img}
        captcha_key={favs.captcha_key}
        setCaptcha={setCaptcha}
        cancelCaptcha={cancelCaptcha}
        submitCaptcha={submitCaptcha}

      />
      : ''
    }

    </div>
  }
}

function mapStateToProps(state) {
  return {favs: state.favs}
}

function mapDispatchToProps(dispatch) {
  return {
    favsActions: bindActionCreators(favsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
