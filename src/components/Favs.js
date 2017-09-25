import React from 'react';


export class FavView extends React.Component {
  render() {
    const {
      title,
      length,
      fetching,
      fetchmessage,
      error,
      completemess,
      get,
      del
    } = this.props;

  return <div className="">
    <btn onClick={get}>получить</btn>
    <h3 className="subtitle">{title}</h3>
    <p className="title">{length}</p>


    {fetching ? <p className="help is-danger is-large">{fetchmessage}</p> : ''}
    {error ? <p className="help is-danger is-large">{error}</p> : ''}
    {completemess ? <div className="help is-large is-success">{completemess}</div> : ''}
    <br /><br />
    {(length && !fetching) ? <btn onClick={del} className="button is-primary is-medium">Удалить нах!</btn> : ''}

    

  </div>




  }
}
