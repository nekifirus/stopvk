import React, { Component } from 'react'

import '../stylesheets/Layout.css';


const YandexDonate = (() => (
  <iframe title="yad" src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%90%D0%B2%D1%82%D0%BE%D1%80%D1%83%20%D0%BD%D0%B0%20%D0%BF%D0%B8%D0%B2%D0%BE&targets-hint=&default-sum=300&button-text=14&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=https%3A%2F%2Fstopvk.party&quickpay=shop&account=410011655241588" width="450" height="213" frameBorder="0" allowTransparency="true" scrolling="no"></iframe>
));


export default class Layout extends Component {

  render () {

    return (
      <div className="container is-fullhd">
        <div className="section is-paddingless">
            {this.props.children}
        </div>
        <div className="footer">

          <h3>license: <a href="https://opensource.org/licenses/mit-license.php">MIT</a></h3>


          <div className="is-pulled-right"><YandexDonate /></div>

        </div>
      </div>
    )











  }
}
