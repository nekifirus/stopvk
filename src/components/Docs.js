import React from 'react';

import {
  GroupButtons,
  Counters
} from './Interface';


export default class DocsView extends React.Component {
  componentDidMount() {
    this.props.get()
  }

  onSelectDoc (doc, index) {
        this.props.select.call(this, doc, index);
  }


  render() {

    const { docsarr, selected, selectAll, drop, del } = this.props;


    const DocCard = (({doc, index}) => (
      <tr className="tr">

        <td className={doc.isSelected ? "td is-primary" : "td"} onClick={this.onSelectDoc.bind(this, doc, index)}>
          <span>{doc.title.substring(0, 20)}</span>
          <a href={doc.url} download={doc.title} className="is-pulled-right" >
            <div className={doc.isSelected ? "button is-info" : "button is-success is-outlined"}>
              <span className="icon is-small">
                <i className="fa fa-floppy-o fa-1x" aria-hidden="true"></i>
              </span>
            </div>
          </a>
        </td>

      </tr>
    ));


    const DocsGroup = docsarr.map((doc, index) => (
      <DocCard key={doc.id} doc={doc} index={index} />
    ));







    return(
      <div className="box has-text-centered">
        <Counters all={docsarr.length} selected={selected} />
        <GroupButtons selectAll={selectAll} drop={drop} del={del} />

        <table className="table is-bordered is-hoverable is-fullwidth">
          <tbody className="tbody has-text-centered">
            {DocsGroup}
          </tbody>
        </table>

      </div>

    )
  }


}
