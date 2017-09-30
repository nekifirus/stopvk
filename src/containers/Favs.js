import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as favsActions from '../actions/FavsActions';

import { FavView } from '../components/Favs';
import Captcha from '../components/Captcha';


class Favs extends Component {

  render() {
    const
      { favs } = this.props,
      { favegetLinks,
        favedelLinks,
        favegetUsers,
        favedelUsers,
        favegetVideos,
        favedelVideos,
        favegetPosts,
        favedelPosts,
        favegetMarkit,
        favedelMarkit,
        setCaptcha,
        cancelCaptcha,
        submitCaptcha
      } = this.props.favsActions;



    return <div>
      <FavView
        title="Ссылок в закладках:"
        length={favs.linklength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetLinks}
        del = {favedelLinks}
      />

      <FavView
        title="Пользователей в закладках:"
        length={favs.userlength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetUsers}
        del = {favedelUsers}
      />

      <FavView
        title="Видеозаписей в закладках:"
        length={favs.videolength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetVideos}
        del = {favedelVideos}
      />


      <FavView
        title="Постов в закладках:"
        length={favs.postslength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetPosts}
        del = {favedelPosts}
      />

      <FavView
        title="Товаров в закладках:"
        length={favs.markitlength}
        fetching={favs.fetching}
        fetchmessage={favs.fetchmessage}
        completemess={favs.completemess}
        error = {favs.error}
        get = {favegetMarkit}
        del = {favedelMarkit}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favs)
