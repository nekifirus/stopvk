import React from 'react';
import Fetcher from './Fetcher';


export default class Wall extends React.Component {
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
        return <btn onClick={stopWallDelete} className="deletebtn">Я передумал</btn>
      } else {
        return <btn onClick={startWallDelete} className="deletebtn">Удалить нах!</btn>
      }
    }

  return <div className="Wall">
    <btn onClick={requestWallPosts}>получить</btn>
    <h3 className="wall-header">Количество записей на стене:</h3>
    <p className="wall-count">{length}</p>


    {fetching ? <Fetcher fetchmessage={fetchmessage} /> : ''}

    {length ? <Buttons /> : ''}

    {completemess ? <div className="complete">{completemess}</div> : ''}








    </div>

  }
}
