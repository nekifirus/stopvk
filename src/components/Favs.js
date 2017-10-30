import React from 'react';

import {
  GroupButtons,
  Counters
} from './Interface';

export class FavView extends React.Component {

  componentDidMount() {
    this.props.get()
  }

  render() {
    const {
      title,
      arr,
      del
    } = this.props;

  return (
    <div>
      <div className="subtitle has-text-centered">{title}</div>
      <Counters all={arr.length} />
      <GroupButtons del={del} />

    </div>

  );




  }
}
