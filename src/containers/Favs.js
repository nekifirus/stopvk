import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as favsActions from '../actions/FavsActions';
import * as captchaActions from '../actions/CaptchaActions'

import { FavView } from '../components/Favs';
import {Fetcher} from '../components/Interface';
import Captcha from '../components/Captcha';


class Favs extends Component {

  render() {
    const
      { favs, captcha } = this.props,
      {
        initFavs,
        favedelLinks,
        favedelUsers,
        favedelVideos,
        favedelPosts,
        favedelMarkit
      } = this.props.favsActions;

      const {
        setCaptcha,
        submitCaptcha,
        cancelCaptcha
      } = this.props.captchaActions;

    return <div>
      <FavView
        title="Ссылки"
        arr={favs.linkarr}
        get={initFavs}
        del = {favedelLinks}
      />

      <FavView
        title="Пользователи"
        arr={favs.userarr}
        get={() =>{}}
        del = {favedelUsers}
      />

      <FavView
        title="Видеозаписи"
        arr={favs.videoarr}
        get={() =>{}}
        del = {favedelVideos}
      />


      <FavView
        title="Посты"
        arr={favs.postsarr}
        get={() =>{}}
        del = {favedelPosts}
      />

      <FavView
        title="Товары"
        arr={favs.markitarr}
        get={() =>{}}
        del = {favedelMarkit}
      />

    {favs.fetching &&
         <Fetcher trigger={favs.fetching}
                  message={favs.fetchmessage}
                  percent={favs.percent}

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
  return {favs: state.favs, captcha: state.captcha}
}

function mapDispatchToProps(dispatch) {
  return {
    favsActions: bindActionCreators(favsActions, dispatch),
    captchaActions: bindActionCreators(captchaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favs)
