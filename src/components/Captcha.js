import React from 'react';

export default class Captcha extends React.Component {
  setCaptcha(e) {
    const
      { setCaptcha } = this.props,
      keysym = e.target.value;
    setCaptcha(keysym);
  };

  submitCaptcha(e) {
    e.preventDefault()
    const { submitCaptcha } = this.props;
    submitCaptcha();
  };

  render() {
    const { captcha_img, captcha_key, cancelCaptcha } = this.props;




    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content box">

        <img className="image" alt="Captcha" src={captcha_img} />

        <div className="control">
          <div className="field">
            <input className="input" type="text"
                  placeholder="Введите значение каптчи сюда"
                  value={captcha_key}
                  onChange={this.setCaptcha.bind(this)} />
          </div>
        </div>

        <br />
        <p><button className="button is-primary" onClick={this.submitCaptcha.bind(this)}>Вроде так</button></p>

      </div>
      <button className="modal-close is-large" aria-label="close" onClick={cancelCaptcha}></button>
    </div>
  }
}
