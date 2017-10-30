import React from 'react';

import {
  DelButton,
  Counters
} from './Interface';


export class Wall extends React.Component {
  componentDidMount() {
    this.props.get()
  }

  render() {
    const {
      posts,
      del
    } = this.props;



  return (
    <div className="box has-text-centered">

      <div className="title">Записей на стене всего:</div>

      <Counters all={posts.length} />
      <DelButton del={del} />


    </div>
  )




  }
}
