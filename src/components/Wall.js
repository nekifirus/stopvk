import React from 'react';


export class Wall extends React.Component {
  render() {
    const {
      length,
      trigger,
      fetching,
      fetchmessage,
      completemess
    } = this.props;

    const {
      requestWallPosts,
      startWallDelete,
      stopWallDelete
    } = this.props.wallActions;

    const Buttons = () => {
      if (trigger) {
        return <btn onClick={stopWallDelete} className="button is-danger is-large">Я передумал</btn>
      } else {
        return <btn onClick={startWallDelete} className="button is-primary is-medium">Удалить нах!</btn>
      }
    }

  return <div className="">
    <btn onClick={requestWallPosts}>получить</btn>
    <h3 className="subtitle">Записей на стене:</h3>
    <p className="title">{length}</p>

    <div className="">
      {fetching ? <p className="help is-danger is-large">{fetchmessage}</p> : ''}
    </div>
    {completemess ? <div className="help is-large is-success">{completemess}</div> : ''}
    <br /><br />
    {length ? <Buttons /> : ''}



  </div>




  }
}
