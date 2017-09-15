import React from 'react';


export class FavLinks extends React.Component {
  render() {
    const {
      length,
      fetching,
      fetchmessage,
      error,
      completemess
    } = this.props;

    const {
      favegetLinks,
      favedelLinks,
    } = this.props.favsActions;



  return <div className="">
    <btn onClick={favegetLinks}>получить</btn>
    <h3 className="subtitle">Ссылок в закладках:</h3>
    <p className="title">{length}</p>


    {fetching ? <p className="help is-danger is-large">{fetchmessage}</p> : ''}
    {error ? <p className="help is-danger is-large">{error}</p> : ''}
    {completemess ? <div className="help is-large is-success">{completemess}</div> : ''}
    <br /><br />
    {length ? <btn onClick={favedelLinks} className="button is-primary is-medium">Удалить нах!</btn> : ''}



  </div>




  }
}
