import React from 'react';

import {SaveButton} from './Interface';



export default class DocsView extends React.Component {
  onSelectDoc (doc, index) {
        this.props.select.call(this, doc, index);
  }
  render() {

    const { docsarr, selectAll } = this.props;


    const DocCard = (({doc, index}) => <tr
        className={doc.isSelected ? "tr is-selected" : "tr"}  key={doc.id.toString()}
        >

      <td className="td" onClick={this.onSelectDoc.bind(this, doc, index)}>
        {doc.title}
      </td>
      <td className="td">
        <a href={doc.url} download={doc.title}><SaveButton /></a>
      </td>


    </tr>);

    const DocsGroup = docsarr.map((doc, index) => <DocCard doc={doc} index={index} />
      );







    return(
      <div>
        <button type="button" className="button is-primary"
                onClick={selectAll}>Выделить все</button>

        <table className="table is-bordered is-hoverable">
          <tbody className="tbody">
            {DocsGroup}
          </tbody>
        </table>

      </div>

    )
  }


}
